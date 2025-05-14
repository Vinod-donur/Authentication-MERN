import React from "react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const VerifyPage = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newCode = [...code];
    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      // Move focus to the next input field if value is entered
      value && index < 5 ? inputRefs.current[index + 1].focus() : null;
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const verificationCode = code.join("");
    console.log("Verification code submitted:", verificationCode);
  }

  useEffect(() => {
    if(code.every((digit)=> digit !== "")){
      // Submit form after every input is filled;
      handleSubmit();
    }
  }, [code]);

  return (
    <motion.div
      intial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 shadow-2xl rounded-2xl p-8 w-full max-w-md"
    >
      <h2 className="font-bold text-center text-gray-900 text-3xl mb-6">
        Verify Your Email
      </h2>
      <p className="text-sm text-center text-gray-600 mb-6">
        Enter the 6-digit code sent to your email address.
      </p>
      <form className="space-y-6">
        <div>
          {code.map((digit, index) => {
            return (
              <input
                type="text"
                key={index}
                className="w-12 h-14 text-center text-2xl border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-600 focus:outline-none ml-3"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300 focus:ring-2 focus:ring-gray-600 focus:outline-none"
        >
          Verify
        </motion.button>
      </form>
    </motion.div>
  );
};

export default VerifyPage;
