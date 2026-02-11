// PrequalifiedCardForm.jsx (part of ResponseForm)
function PrequalifiedCardForm({ state, setState, fieldErrors, MAX_LIMIT }) {
  const paymentDates = [4,5,6,10,15,30];
  const repaymentOptions = Array.from({length:10}, (_,i)=>(i+1)*10); // 10%,20%,..100%

  const handleSuppChange = (field, value) => {
    setState({...state, supp: {...state.supp, [field]: value}});
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 space-y-3">
        <label className="block font-semibold">ID Number</label>
        <input type="text" value={state.idNumber} onChange={e=>setState({...state, idNumber:e.target.value})} className="w-full border-2 px-3 py-2 rounded-lg"/>
        <label className="block font-semibold">Email</label>
        <input type="email" value={state.email} onChange={e=>setState({...state, email:e.target.value})} className="w-full border-2 px-3 py-2 rounded-lg"/>
        <label className="block font-semibold">Mobile</label>
        <input type="tel" value={state.mobile} onChange={e=>setState({...state, mobile:e.target.value})} className="w-full border-2 px-3 py-2 rounded-lg"/>
      </div>

      {/* Take Card Decision */}
      <div className="p-4 bg-green-50 rounded-xl border border-green-100">
        <p className="font-semibold mb-2">Do you wish to take up the credit card?</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={state.takeCard==="YES"} onChange={()=>setState({...state, takeCard:"YES"})} className="accent-ncba-primary w-5 h-5"/>
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={state.takeCard==="NO"} onChange={()=>setState({...state, takeCard:"NO"})} className="accent-ncba-primary w-5 h-5"/>
            <span>No</span>
          </label>
        </div>
      </div>

      {/* YES path */}
      {state.takeCard==="YES" && (
        <div className="space-y-6">
          {/* Limit Confirmation */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="font-semibold mb-2">Confirm the proposed limit (Max {MAX_LIMIT.toLocaleString()})?</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={state.confirmFullLimit==="YES"} onChange={()=>setState({...state, confirmFullLimit:"YES"})} className="accent-ncba-primary w-5 h-5"/>
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={state.confirmFullLimit==="NO"} onChange={()=>setState({...state, confirmFullLimit:"NO"})} className="accent-ncba-primary w-5 h-5"/>
                <span>No</span>
              </label>
            </div>
            {state.confirmFullLimit==="NO" && (
              <input type="number" value={state.customLimit} onChange={e=>setState({...state, customLimit:e.target.value})} placeholder="Enter desired limit" className="w-full border-2 px-3 py-2 rounded-lg mt-2"/>
            )}
          </div>

          {/* Payment Info */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-3">
            <label className="font-semibold">Preferred Payment Date</label>
            <select value={state.paymentDate} onChange={e=>setState({...state, paymentDate:e.target.value})} className="w-full border-2 px-3 py-2 rounded-lg">
              <option value="">Select date</option>
              {paymentDates.map(d=><option key={d} value={d}>{d}th</option>)}
            </select>

            <label className="font-semibold">Monthly Repayment %</label>
            <select value={state.monthlyRepayment} onChange={e=>setState({...state, monthlyRepayment:e.target.value})} className="w-full border-2 px-3 py-2 rounded-lg">
              <option value="">Select %</option>
              {repaymentOptions.map(p=><option key={p} value={p}>{p}%</option>)}
            </select>

            <label className="font-semibold">Collection Preference</label>
            <select value={state.collectionPreference} onChange={e=>setState({...state, collectionPreference:e.target.value})} className="w-full border-2 px-3 py-2 rounded-lg">
              <option value="">Select</option>
              <option value="Branch">Branch</option>
              <option value="Delivery">Delivered to me</option>
            </select>

            <label className="font-semibold">Primary Account</label>
            <input type="text" value={state.primaryAccount} onChange={e=>setState({...state, primaryAccount:e.target.value})} className="w-full border-2 px-3 py-2 rounded-lg"/>

            <label className="font-semibold">Employer Name</label>
            <input type="text" value={state.employer} onChange={e=>setState({...state, employer:e.target.value})} className="w-full border-2 px-3 py-2 rounded-lg"/>

            <label className="font-semibold">Employer Email</label>
            <input type="email" value={state.employerEmail} onChange={e=>setState({...state, employerEmail:e.target.value})} className="w-full border-2 px-3 py-2 rounded-lg"/>
          </div>

          {/* Supplementary Card */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={state.suppCard} onChange={e=>setState({...state, suppCard:e.target.checked})} className="accent-ncba-primary w-5 h-5"/>
              <span>Issue supplementary card?</span>
            </label>

            {state.suppCard && (
              <div className="space-y-2 mt-2">
                <input type="number" placeholder="Sub limit" value={state.supp.subLimit} onChange={e=>handleSuppChange("subLimit", e.target.value)} className="w-full border-2 px-3 py-2 rounded-lg"/>
                <input type="text" placeholder="Name" value={state.supp.name} onChange={e=>handleSuppChange("name", e.target.value)} className="w-full border-2 px-3 py-2 rounded-lg"/>
                <input type="text" placeholder="Relationship" value={state.supp.relationship} onChange={e=>handleSuppChange("relationship", e.target.value)} className="w-full border-2 px-3 py-2 rounded-lg"/>
                <input type="tel" placeholder="Mobile" value={state.supp.mobile} onChange={e=>handleSuppChange("mobile", e.target.value)} className="w-full border-2 px-3 py-2 rounded-lg"/>
                <input type="email" placeholder="Email" value={state.supp.email} onChange={e=>handleSuppChange("email", e.target.value)} className="w-full border-2 px-3 py-2 rounded-lg"/>
                <input type="date" placeholder="DOB" value={state.supp.dob} onChange={e=>handleSuppChange("dob", e.target.value)} className="w-full border-2 px-3 py-2 rounded-lg"/>
                <input type="text" placeholder="ID/Passport Number" value={state.supp.idNumber} onChange={e=>handleSuppChange("idNumber", e.target.value)} className="w-full border-2 px-3 py-2 rounded-lg"/>
                <input type="text" placeholder="Country of Issue" value={state.supp.country} onChange={e=>handleSuppChange("country", e.target.value)} className="w-full border-2 px-3 py-2 rounded-lg"/>
                <input type="date" placeholder="Date of Issue" value={state.supp.issueDate} onChange={e=>handleSuppChange("issueDate", e.target.value)} className="w-full border-2 px-3 py-2 rounded-lg"/>
                <input type="file" onChange={e=>handleSuppChange("idFile", e.target.files[0])} className="w-full border-2 px-3 py-2 rounded-lg"/>
              </div>
            )}
          </div>

          {/* T&Cs */}
          <div className="p-4 bg-white rounded-xl border-2 border-ncba-primary">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={state.tcsAccepted} onChange={e=>setState({...state, tcsAccepted:e.target.checked})} className="accent-ncba-primary w-5 h-5 mt-1"/>
              <span className="text-sm">I agree to the Credit Card Terms & Conditions</span>
            </label>
          </div>
        </div>
      )}

      {/* NO path */}
      {state.takeCard==="NO" && (
        <div className="p-4 bg-red-50 rounded-xl border border-red-200">
          <label className="block font-semibold mb-2">Reason for declining</label>
          <input type="text" value={state.declineReason} onChange={e=>setState({...state, declineReason:e.target.value})} className="w-full border-2 px-3 py-2 rounded-lg"/>
        </div>
      )}
    </div>
  );
}
