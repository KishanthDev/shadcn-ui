'use client';

import { useGateValue, useDynamicConfig } from "@statsig/react-bindings";

interface ConfigSection {
  title?: string;
  message?: string;
  color?: string;
}

export default function FeatureTest() {
  const gateTest = useGateValue("test");

  const ischromegate = useGateValue("new_feature_test");

  const config = useDynamicConfig("new-changes");

  // Load config sections
  const enabled = config.get("enabledState", {}) as ConfigSection;
  const disabled = config.get("disabledState", {}) as ConfigSection;

  // Select the correct section based on gate
  const activeConfig = gateTest ? enabled : disabled;
  const ischrome = ischromegate ? "True" : "False";

  const title = activeConfig.title || "Default Title";
  const message = activeConfig.message || "Default Message";
  const color = activeConfig.color || "gray";

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Feature Gate + Dynamic Config
      </h1>

      <div>
        <strong>Is Chrome</strong> {ischrome}
      </div>

      {/* FEATURE GATE STATUS */}
      <div className="border rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Feature Gate</h2>

        <div className="flex items-center gap-2 mb-3">
          <span>{gateTest?'Using Mobile':'Using Desktop'}</span>
          <span
            className={`px-3 py-1 rounded ${
              gateTest ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
            }`}
          >
            {gateTest ? "✓ Enabled" : "✗ Disabled"}
          </span>
        </div>
      </div>

      {/* UI FROM CONFIG */}
      <div className={`border-l-4 p-4 mb-4 bg-${color}-50 border-${color}-500`}>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p>{message}</p>

        <div className="mt-3">
          <span className={`px-3 py-1 rounded bg-${color}-100 text-${color}-800`}>
            color = {color}
          </span>
        </div>
      </div>
    </div>
  );
}
