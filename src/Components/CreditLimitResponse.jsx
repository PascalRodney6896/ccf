import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ResponseForm from "./ResponseForm";
import ncbaLogo from "../assets/Ncba.png"; // import NCBA logo

function NcbaLogo({ size = 48 }) {
  return <img src={ncbaLogo} alt="NCBA Bank" style={{ height: size, width: "auto" }} />;
}

export default function CreditLimitResponse() {
  const MAX_LIMIT = 500000;
  const CURRENT_LIMIT = 300000;

  const [searchParams] = useSearchParams();
  const referenceId = searchParams.get("ref");

  const [decision, setDecision] = useState("");
  const [acceptFull, setAcceptFull] = useState("");
  const [requestedLimit, setRequestedLimit] = useState("");
  const [tcsAccepted, setTcsAccepted] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [idNumber, setIdNumber] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!referenceId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Invalid or expired request. Please contact the bank.
      </div>
    );
  }

  const validateFields = () => {
    const errs = {};
    const idRegex = /^\d{7,9}$/;

    if (!idNumber) errs.idNumber = "ID Number is required";
    else if (!idRegex.test(idNumber)) errs.idNumber = "Invalid ID number format";

    if (!consentAccepted) errs.consent = "Consent is required";

    if (!decision) errs.decision = "Please select Yes or No";

    if (decision === "YES") {
      if (!acceptFull) errs.acceptFull = "Confirm limit option";

      if (acceptFull === "NO") {
        const val = Number(requestedLimit);
        if (!val || val <= CURRENT_LIMIT) errs.requestedLimit = "Limit must be higher than current limit";
        if (val > MAX_LIMIT) errs.requestedLimit = "Limit exceeds the recommended maximum";
      }

      if (!tcsAccepted) errs.tcsAccepted = "You must accept the Credit Card Terms & Conditions";
    }

    if (decision === "NO") {
      errs.declineReason = errs.declineReason || "Please provide a reason for declining";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      setError("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);

    // Simulate API submission delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
        <div className="max-w-xl w-full bg-white shadow-2xl rounded-xl p-8 border-t-4 border-green-500 text-center">
          <img src={ncbaLogo} alt="NCBA Bank" className="mx-auto h-16 w-auto mb-4" />
          <h2 className="text-3xl font-bold text-green-700 mb-2">Your response has been recorded!</h2>
          <p className="text-gray-700 mb-2">
            Thank you for updating your credit card limit preference.
          </p>
          <p className="text-gray-600 mb-4">
            Reference ID: <span className="font-semibold">{referenceId}</span>
          </p>
          <p className="text-sm text-gray-500">
            Our system will process your request and alert you once your new limit is loaded.  
            Ensure you have accepted the Credit Card Terms & Conditions for the request to be processed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <NcbaLogo size={48} />
        <div>
          <div className="text-xl font-bold text-ncba-primary">NCBA</div>
          <div className="text-sm text-gray-600">Credit Card Services</div>
        </div>
      </header>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow max-w-2xl mx-auto">
        <div className="p-6 border-b">
          <p className="text-sm font-semibold">Reference ID: {referenceId}</p>
        </div>

        <ResponseForm
          referenceId={referenceId}
          MAX_LIMIT={MAX_LIMIT}
          CURRENT_LIMIT={CURRENT_LIMIT}
          decision={decision}
          setDecision={setDecision}
          acceptFull={acceptFull}
          setAcceptFull={setAcceptFull}
          requestedLimit={requestedLimit}
          setRequestedLimit={setRequestedLimit}
          tcsAccepted={tcsAccepted}
          setTcsAccepted={setTcsAccepted}
          consentAccepted={consentAccepted}
          setConsentAccepted={setConsentAccepted}
          idNumber={idNumber}
          setIdNumber={setIdNumber}
          fieldErrors={fieldErrors}
          error={error}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
