import React, { useRef, useState } from "react";

function VerifyCode() {
  const inputRefs = useRef([]);
  const [code, setCode] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState("");

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;

    const newCode = [...code];
    newCode[index] = val[0];
    setCode(newCode);

    // Move focus to next box
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);

      if (index > 0 && !code[index]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join("");
    const correctCode = "123456";

    if (enteredCode === correctCode) {
      setMessage("✅ Email verified successfully!");
    } else {
      setMessage("❌ Incorrect code. Try again.");
    }
  };

  return (
    
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Verify your email address
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          We emailed you a 6-digit code. Enter it below to confirm your email.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-14 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium"
          >
            Verify
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
  );
}

export default VerifyCode;
