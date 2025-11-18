'use client';
import { useGateValue } from "@statsig/react-bindings";

export default function FeatureTest() {
  // First gate
  const gateTest = useGateValue("test");

  console.log("Gate: test =", gateTest);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {gateTest
          ? "Feature Gate Test"
          : "Feature disabled — view on mobile to enable"}
      </h1>

      {/* FIRST GATE CARD */}
      <div className="border rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Feature Status</h2>

        <div className="flex items-center gap-2 mb-3">
          <span>test:</span>
          <span
            className={`px-3 py-1 rounded ${
              gateTest
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {gateTest ? "✓ Enabled" : "✗ Disabled"}
          </span>
        </div>
      </div>

      {/* CONTENT FOR FIRST GATE */}
      {gateTest ? (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <h3 className="font-semibold text-blue-900 mb-2">🎉 test Active!</h3>
          <p className="text-blue-800">
            This content is visible when the <b>test</b> gate is enabled.
          </p>
        </div>
      ) : (
        <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">test Disabled</h3>
          <p className="text-gray-800">
            This content shows when the <b>test</b> feature is disabled.<br />
            <span className="font-semibold text-red-700">
              View on mobile to enable this feature.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
