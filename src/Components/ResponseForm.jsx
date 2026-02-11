// ResponseForm.jsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ncbaLogo from "../assets/Ncba.png";

function NcbaLogo({ size = 48 }) {
  return <img src={ncbaLogo} alt="NCBA Bank" style={{ height: size, width: "auto" }} />;
}

export default function ResponseForm() {
  const [searchParams] = useSearchParams();
  const referenceId = searchParams.get("ref");

  // ------------------- Campaign Selection -------------------
  const [campaignType, setCampaignType] = useState("limit"); // "limit" or "prequalified"

  if (!referenceId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Invalid request
      </div>
    );
  }

  // ------------------- Credit Limit Increase State -------------------
  const MAX_LIMIT_LIMIT = 500000;
  const CURRENT_LIMIT = 300000;

  const [idNumberLimit, setIdNumberLimit] = useState("");
  const [decision, setDecision] = useState("");
  const [acceptFull, setAcceptFull] = useState("");
  const [requestedLimit, setRequestedLimit] = useState("");
  const [declineReasonLimit, setDeclineReasonLimit] = useState("");
  const [tcsAcceptedLimit, setTcsAcceptedLimit] = useState(false);

  // ------------------- Prequalified Card State -------------------
  const MAX_LIMIT_PREQUALIFIED = 200000;

  const [takeCard, setTakeCard] = useState("");
  const [confirmFullLimit, setConfirmFullLimit] = useState("");
  const [customLimit, setCustomLimit] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [monthlyRepayment, setMonthlyRepayment] = useState("");
  const [collectionPreference, setCollectionPreference] = useState("");
  const [primaryAccount, setPrimaryAccount] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [employer, setEmployer] = useState("");
  const [employerEmail, setEmployerEmail] = useState("");
  const [suppCard, setSuppCard] = useState(false);
  const [suppName, setSuppName] = useState("");
  const [suppRelationship, setSuppRelationship] = useState("");
  const [suppMobile, setSuppMobile] = useState("");
  const [suppEmail, setSuppEmail] = useState("");
  const [suppDOB, setSuppDOB] = useState("");
  const [suppIDNumber, setSuppIDNumber] = useState("");
  const [suppIDFile, setSuppIDFile] = useState(null);
  const [tcsAccepted, setTcsAccepted] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

  // ------------------- Common State -------------------
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ------------------- Validation -------------------
  const validateFields = () => {
    const errs = {};
    const idRegex = /^\d{7,9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10,12}$/;

    if (campaignType === "limit") {
      if (!idNumberLimit || !idRegex.test(idNumberLimit)) errs.idNumberLimit = "Enter a valid ID number";
      if (!decision) errs.decision = "Select Yes or No";

      if (decision === "YES") {
        if (!acceptFull) errs.acceptFull = "Confirm full limit";
        if (acceptFull === "NO" && (!requestedLimit || Number(requestedLimit) <= CURRENT_LIMIT))
          errs.requestedLimit = "Enter a valid requested limit";
        if (!tcsAcceptedLimit) errs.tcsAcceptedLimit = "Accept the T&Cs";
      }

      if (decision === "NO" && !declineReasonLimit) errs.declineReasonLimit = "Select reason for declining";
    } else {
      // Prequalified Card
      if (!idNumber || !idRegex.test(idNumber)) errs.idNumber = "Enter valid ID number";
      if (!email || !emailRegex.test(email)) errs.email = "Enter valid email";
      if (!mobile || !mobileRegex.test(mobile)) errs.mobile = "Enter valid mobile number";
      if (!tcsAccepted) errs.tcsAccepted = "Accept the T&Cs";

      if (takeCard === "YES") {
        if (!confirmFullLimit) errs.confirmFullLimit = "Confirm full limit";
        if (confirmFullLimit === "NO" && (!customLimit || Number(customLimit) <= 0)) errs.customLimit = "Enter valid custom limit";
        if (!paymentDate) errs.paymentDate = "Select payment date";
        if (!monthlyRepayment) errs.monthlyRepayment = "Select monthly repayment";
        if (!collectionPreference) errs.collectionPreference = "Select collection preference";
        if (!primaryAccount) errs.primaryAccount = "Enter primary account";
        if (!employer) errs.employer = "Enter employer";
        if (!employerEmail || !emailRegex.test(employerEmail)) errs.employerEmail = "Enter valid employer email";

        if (suppCard) {
          if (!suppName) errs.suppName = "Enter supplementary card holder name";
          if (!suppRelationship) errs.suppRelationship = "Enter relationship";
          if (!suppMobile || !mobileRegex.test(suppMobile)) errs.suppMobile = "Enter valid mobile";
          if (!suppEmail || !emailRegex.test(suppEmail)) errs.suppEmail = "Enter valid email";
          if (!suppDOB) errs.suppDOB = "Enter DOB";
          if (!suppIDNumber) errs.suppIDNumber = "Enter ID/Passport Number";
          if (!suppIDFile) errs.suppIDFile = "Upload ID copy";
        }
      } else if (takeCard === "NO" && !declineReason) {
        errs.declineReason = "Select reason for declining";
      }
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ------------------- Submit -------------------
  const handleSubmit = async () => {
    setError("");
    if (!validateFields()) {
      setError("Please fix the highlighted fields.");
      return;
    }
    setLoading(true);

    try {
      const payload = { campaignType, referenceId };
      if (campaignType === "limit") {
        payload.data = { idNumberLimit, decision, acceptFull, requestedLimit, declineReasonLimit, tcsAcceptedLimit };
      } else {
        payload.data = {
          takeCard,
          confirmFullLimit,
          customLimit,
          paymentDate,
          monthlyRepayment,
          collectionPreference,
          primaryAccount,
          idNumber,
          email,
          mobile,
          employer,
          employerEmail,
          supplementaryCard: suppCard
            ? { suppName, suppRelationship, suppMobile, suppEmail, suppDOB, suppIDNumber, suppIDFile }
            : null,
          tcsAccepted,
          declineReason: takeCard === "NO" ? declineReason : null,
        };
      }
      console.log("Payload submitted:", payload);
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please try again.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center border-t-4 border-green-600 max-w-lg">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Application Submitted Successfully!</h2>
          <p className="text-gray-700 mb-2">
            Thank you for your response. Your submission has been received and is being processed.
          </p>
          <p className="text-gray-500 text-sm">Reference ID: <strong>{referenceId}</strong></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <header className="flex items-center gap-3 mb-6">
        <NcbaLogo size={48} />
        <div>
          <div className="text-xl font-bold">NCBA</div>
          <div className="text-sm">{campaignType === "limit" ? "Credit Limit Increase" : "Prequalified Card Campaign"}</div>
        </div>
      </header>

      {/* Campaign Selector */}
      <div className="max-w-3xl mx-auto mb-6 flex gap-4">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${campaignType === "limit" ? "bg-blue-600 text-white" : "bg-white border"}`}
          onClick={() => setCampaignType("limit")}
        >
          Limit Increase
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${campaignType === "prequalified" ? "bg-blue-600 text-white" : "bg-white border"}`}
          onClick={() => setCampaignType("prequalified")}
        >
          Prequalified Card
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow max-w-3xl mx-auto p-6 space-y-6">
        {campaignType === "limit" ? (
          <CreditLimitForm
            idNumberLimit={idNumberLimit}
            setIdNumberLimit={setIdNumberLimit}
            decision={decision}
            setDecision={setDecision}
            acceptFull={acceptFull}
            setAcceptFull={setAcceptFull}
            requestedLimit={requestedLimit}
            setRequestedLimit={setRequestedLimit}
            declineReasonLimit={declineReasonLimit}
            setDeclineReasonLimit={setDeclineReasonLimit}
            tcsAcceptedLimit={tcsAcceptedLimit}
            setTcsAcceptedLimit={setTcsAcceptedLimit}
            fieldErrors={fieldErrors}
            MAX_LIMIT={MAX_LIMIT_LIMIT}
            CURRENT_LIMIT={CURRENT_LIMIT}
          />
        ) : (
          <PrequalifiedCardForm
            takeCard={takeCard} setTakeCard={setTakeCard}
            confirmFullLimit={confirmFullLimit} setConfirmFullLimit={setConfirmFullLimit}
            customLimit={customLimit} setCustomLimit={setCustomLimit}
            paymentDate={paymentDate} setPaymentDate={setPaymentDate}
            monthlyRepayment={monthlyRepayment} setMonthlyRepayment={setMonthlyRepayment}
            collectionPreference={collectionPreference} setCollectionPreference={setCollectionPreference}
            primaryAccount={primaryAccount} setPrimaryAccount={setPrimaryAccount}
            idNumber={idNumber} setIdNumber={setIdNumber}
            email={email} setEmail={setEmail} mobile={mobile} setMobile={setMobile}
            employer={employer} setEmployer={setEmployer} employerEmail={employerEmail} setEmployerEmail={setEmployerEmail}
            suppCard={suppCard} setSuppCard={setSuppCard} suppName={suppName} setSuppName={setSuppName}
            suppRelationship={suppRelationship} setSuppRelationship={setSuppRelationship} suppMobile={suppMobile} setSuppMobile={setSuppMobile}
            suppEmail={suppEmail} setSuppEmail={setSuppEmail} suppDOB={suppDOB} setSuppDOB={setSuppDOB} suppIDNumber={suppIDNumber} setSuppIDNumber={setSuppIDNumber}
            suppIDFile={suppIDFile} setSuppIDFile={setSuppIDFile} tcsAccepted={tcsAccepted} setTcsAccepted={setTcsAccepted}
            declineReason={declineReason} setDeclineReason={setDeclineReason} fieldErrors={fieldErrors} MAX_LIMIT={MAX_LIMIT_PREQUALIFIED}
          />
        )}

        {error && <p className="text-red-600 font-semibold text-center">{error}</p>}

        <button onClick={handleSubmit} disabled={loading} className="w-full py-3 bg-gradient-to-r from-ncba-primary to-blue-600 text-white rounded-lg font-bold">
          {loading ? "Submitting..." : "Submit Response"}
        </button>
      </div>
    </div>
  );
}

// ------------------- Credit Limit Increase Form -------------------
function CreditLimitForm({
  idNumberLimit, setIdNumberLimit,
  decision, setDecision,
  acceptFull, setAcceptFull,
  requestedLimit, setRequestedLimit,
  declineReasonLimit, setDeclineReasonLimit,
  tcsAcceptedLimit, setTcsAcceptedLimit,
  fieldErrors, MAX_LIMIT, CURRENT_LIMIT
}) {
  return (
    <>
      {/* ID Number */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
        <label className="block font-semibold mb-2">ID Number</label>
        <input type="text" value={idNumberLimit} onChange={e => setIdNumberLimit(e.target.value)}
               className={`w-full border-2 px-3 py-2 rounded-lg ${fieldErrors.idNumberLimit ? "border-red-400" : "border-blue-200"}`} />
        {fieldErrors.idNumberLimit && <p className="text-red-600 text-sm mt-1">{fieldErrors.idNumberLimit}</p>}
      </div>

      {/* Decision */}
      <div className="p-4 bg-green-50 rounded-xl border border-green-100">
        <p className="font-semibold mb-2">Do you wish to take up the additional credit card limit?</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={decision==="YES"} onChange={()=>setDecision("YES")} className="accent-ncba-primary w-5 h-5"/>
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={decision==="NO"} onChange={()=>setDecision("NO")} className="accent-ncba-primary w-5 h-5"/>
            <span>No</span>
          </label>
        </div>
        {fieldErrors.decision && <p className="text-red-600 text-sm mt-1">{fieldErrors.decision}</p>}
      </div>

      {/* YES path */}
      {decision==="YES" && (
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-3">
          <p className="font-semibold">Accept the full recommended limit ({MAX_LIMIT.toLocaleString()})?</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={acceptFull==="YES"} onChange={()=>setAcceptFull("YES")} className="accent-ncba-primary w-5 h-5"/>
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={acceptFull==="NO"} onChange={()=>setAcceptFull("NO")} className="accent-ncba-primary w-5 h-5"/>
              <span>No</span>
            </label>
          </div>
          {acceptFull==="NO" && (
            <input type="number" value={requestedLimit} onChange={e=>setRequestedLimit(e.target.value)}
                   placeholder="Enter desired limit" className={`w-full border-2 px-3 py-2 rounded-lg ${fieldErrors.requestedLimit ? "border-red-400":"border-blue-200"}`} />
          )}

          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={tcsAcceptedLimit} onChange={e=>setTcsAcceptedLimit(e.target.checked)} className="accent-ncba-primary w-5 h-5"/>
            <span>I agree to the <a href="#" className="text-ncba-primary underline">Credit Card Terms & Conditions</a></span>
          </label>
          {fieldErrors.tcsAcceptedLimit && <p className="text-red-600 text-sm mt-1">{fieldErrors.tcsAcceptedLimit}</p>}
        </div>
      )}

      {/* NO path */}
      {decision==="NO" && (
        <div className="p-4 bg-red-50 rounded-xl border border-red-200">
          <label className="block font-semibold mb-2">Reason for declining</label>
          <input type="text" value={declineReasonLimit} onChange={e=>setDeclineReasonLimit(e.target.value)}
                 className="w-full border-2 border-red-200 rounded-lg px-3 py-2"/>
        </div>
      )}
    </>
  );
}

// ------------------- Prequalified Card Form -------------------
function PrequalifiedCardForm(props){
  // Use props for state
  const { takeCard, setTakeCard, confirmFullLimit, setConfirmFullLimit, customLimit, setCustomLimit,
          paymentDate, setPaymentDate, monthlyRepayment, setMonthlyRepayment, collectionPreference, setCollectionPreference,
          primaryAccount, setPrimaryAccount, idNumber, setIdNumber, email, setEmail, mobile, setMobile,
          employer, setEmployer, employerEmail, setEmployerEmail, suppCard, setSuppCard,
          suppName, setSuppName, suppRelationship, setSuppRelationship, suppMobile, setSuppMobile,
          suppEmail, setSuppEmail, suppDOB, setSuppDOB, suppIDNumber, setSuppIDNumber,
          suppIDFile, setSuppIDFile, tcsAccepted, setTcsAccepted,
          declineReason, setDeclineReason, fieldErrors, MAX_LIMIT } = props;

  return (
    <div className="space-y-6">
      {/* Consent */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p className="font-semibold mb-2">Do you wish to take up the proposed credit card?</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={takeCard==="YES"} onChange={()=>setTakeCard("YES")} className="accent-ncba-primary w-5 h-5"/>
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={takeCard==="NO"} onChange={()=>setTakeCard("NO")} className="accent-ncba-primary w-5 h-5"/>
            <span>No</span>
          </label>
        </div>
        {fieldErrors.takeCard && <p className="text-red-600 text-sm mt-1">{fieldErrors.takeCard}</p>}
      </div>

      {takeCard === "YES" && (
        <div className="space-y-4">
          {/* Full or Custom Limit */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="font-semibold mb-2">Confirm full proposed limit ({MAX_LIMIT.toLocaleString()})?</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={confirmFullLimit==="YES"} onChange={()=>setConfirmFullLimit("YES")} className="accent-ncba-primary w-5 h-5"/>
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={confirmFullLimit==="NO"} onChange={()=>setConfirmFullLimit("NO")} className="accent-ncba-primary w-5 h-5"/>
                <span>No</span>
              </label>
            </div>
            {confirmFullLimit==="NO" && (
              <input type="number" value={customLimit} onChange={e=>setCustomLimit(e.target.value)}
                     placeholder="Enter desired limit" className={`w-full border-2 px-3 py-2 rounded-lg ${fieldErrors.customLimit ? "border-red-400":"border-blue-200"}`} />
            )}
          </div>

          {/* Payment Date */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <label className="block font-semibold mb-2">Select payment date</label>
            <select value={paymentDate} onChange={e=>setPaymentDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg border-blue-200">
              <option value="">Select date</option>
              <option value="4">4th</option>
              <option value="5">5th</option>
              <option value="6">6th</option>
              <option value="10">10th</option>
              <option value="15">15th</option>
              <option value="30">30th</option>
            </select>
          </div>

          {/* Monthly repayment */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <label className="block font-semibold mb-2">Select monthly repayment %</label>
            <select value={monthlyRepayment} onChange={e=>setMonthlyRepayment(e.target.value)} className="w-full px-3 py-2 border rounded-lg border-blue-200">
              <option value="">Select percentage</option>
              {Array.from({length: 10}, (_, i)=> (i+1)*10).map(p => <option key={p} value={p}>{p}%</option>)}
            </select>
          </div>

          {/* Collection Preference */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <label className="block font-semibold mb-2">Collection preference</label>
            <select value={collectionPreference} onChange={e=>setCollectionPreference(e.target.value)} className="w-full px-3 py-2 border rounded-lg border-blue-200">
              <option value="">Select</option>
              <option value="Branch">Branch</option>
              <option value="Delivery">Delivered to you</option>
            </select>
          </div>

          {/* Primary Account */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <label className="block font-semibold mb-2">Primary account for repayment</label>
            <input type="text" value={primaryAccount} onChange={e=>setPrimaryAccount(e.target.value)} className="w-full border-2 px-3 py-2 rounded-lg border-blue-200"/>
          </div>
        </div>
      )}

      {takeCard === "NO" && (
        <div className="p-4 bg-red-50 rounded-xl border border-red-200">
          <label className="block font-semibold mb-2">Reason for declining</label>
          <input type="text" value={declineReason} onChange={e=>setDeclineReason(e.target.value)} className="w-full border-2 px-3 py-2 rounded-lg border-red-200"/>
        </div>
      )}
    </div>
  );
}
