'use client';
import { useGateValue } from "@statsig/react-bindings";

export default function FeatureTest() {

  // Always call the hook
  const gateValue = useGateValue("test");
  console.log(`Feature Gate Value: ${gateValue}`);

  const gate = gateValue ;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Feature Gate Test</h1>
      <div className="border rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Feature Status</h2>
        <div className="flex items-center gap-2">
          <span>new_feature_test:</span>
          <span
            className={`px-3 py-1 rounded ${
              gate
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {gate ? "✓ Enabled" : "✗ Disabled"}
          </span>
        </div>
      </div>

      {gate ? (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <h3 className="font-semibold text-blue-900 mb-2">🎉 New Feature Active!</h3>
          <p className="text-blue-800">
            This content is visible when the Statsig feature gate is enabled.
          </p>
        </div>
      ) : (
        <div className="bg-gray-50 border-l-4 border-gray-500 p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Default Content</h3>
          <p className="text-gray-800">
            This content shows when the feature is disabled.
          </p>
        </div>
      )}
    </div>
  );
}
