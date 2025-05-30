import { useState } from "react";

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [advice, setAdvice] = useState("");
  const [showModal, setShowModal] = useState(false);

  const symptomsList = [
    "fever",
    "sore throat",
    "headache",
    "cough",
    "body ache",
    "nausea",
    "skin rash",
    "chest pain",
    "abdominal pain",
    "irregular periods",
    "dizziness",
    "vomiting",
    "child fever",
  ];

  const doctorMapping = [
    {
      doctor: "👨‍⚕️ General Physician",
      symptoms: ["fever", "sore throat", "body ache", "cough", "chest pain"],
    },
    { doctor: "🧠 Neurologist", symptoms: ["headache", "nausea", "dizziness"] },
    { doctor: "🩺 Dermatologist", symptoms: ["skin rash"] },
    { doctor: "🧒 Pediatrician", symptoms: ["child fever"] },
    { doctor: "👩‍⚕️ Gynecologist", symptoms: ["irregular periods"] },
    {
      doctor: "🧪 Gastroenterologist",
      symptoms: ["abdominal pain", "vomiting"],
    },
  ];

  const handleCheckboxChange = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const checkSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      setAdvice("❗ Please select at least one symptom.");
      setShowModal(true);
      return;
    }

    let matchedDoctor = null;
    for (let mapping of doctorMapping) {
      if (
        mapping.symptoms.some((symptom) => selectedSymptoms.includes(symptom))
      ) {
        matchedDoctor = mapping.doctor;
        break;
      }
    }

    setAdvice(
      matchedDoctor
        ? `Based on your symptoms, you should consult a: <br><strong>${matchedDoctor}</strong>`
        : "⚠️ No specific recommendation found. Please consult a General Physician."
    );
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-blue-100 mt-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">
        🩻 Symptom Checker
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Select the symptoms you're experiencing to receive a doctor
        recommendation.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {symptomsList.map((symptom) => (
          <button
            key={symptom}
            onClick={() => handleCheckboxChange(symptom)}
            className={`px-3 py-2 rounded-full text-sm capitalize border transition duration-200 ${
              selectedSymptoms.includes(symptom)
                ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-blue-50"
            }`}
          >
            {symptom}
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={checkSymptoms}
          className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
        >
          Check Guidance
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md mx-4 p-6 rounded-xl shadow-lg relative">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              💡 Doctor Suggestion
            </h3>
            <div
              className="text-gray-700 text-sm"
              dangerouslySetInnerHTML={{ __html: advice }}
            />
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
