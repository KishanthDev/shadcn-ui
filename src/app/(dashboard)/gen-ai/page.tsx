"use client";

import { useState, useEffect } from "react";
import { useGateValue, useDynamicConfig } from "@statsig/react-bindings";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Laptop, Smartphone, Chrome, Globe } from "lucide-react";

type TestParameters = {
  device_card?: string;
  browser_card?: string;
};

type FeatureConfig = {
  title?: string;
  message?: string;
  color?: string;
};

export default function FeatureTest() {
  const isMobile = useGateValue("test"); // mobile vs desktop
  const isChrome = useGateValue("new_feature_test"); // chrome vs others

  const config = useDynamicConfig("new-changes");

  const enabled = config.get("enabledState", {}) as FeatureConfig;
  const disabled = config.get("disabledState", {}) as FeatureConfig;

  const activeConfig: FeatureConfig = isMobile ? enabled : disabled;

  const title = activeConfig.title ?? "Welcome";
  const message = activeConfig.message ?? "This is your dynamic UI preview.";
  const color = activeConfig.color ?? "blue";

  const [params, setParams] = useState<TestParameters | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchParams = async () => {
      try {
        const res = await fetch("/api/statsig/parameters");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) {
          setParams(data.testParameter || {});
        }
      } catch (error) {
        console.error("Error fetching parameter store data:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    fetchParams();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-3">
      {/* HEADER */}
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Statsig Feature Demo</h1>
        <p className="text-muted-foreground">Dynamic UI based on feature gates</p>
      </div>

      {/* DEVICE CARD */}
      <Card className="shadow-md border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isMobile ? (
              <Smartphone className="w-5 h-5 text-blue-500" />
            ) : (
              <Laptop className="w-5 h-5 text-purple-500" />
            )}
            {isMobile ? "Mobile UI Active" : "Desktop UI Active"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {loading ? (
            <span className="text-gray-400">Loading...</span>
          ) : (
            params?.device_card ?? "The interface below changes based on the user device type"
          )}
        </CardContent>
      </Card>

      {/* BROWSER CARD */}
      <Card className="shadow-md border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isChrome ? (
              <Chrome className="w-5 h-5 text-green-500" />
            ) : (
              <Globe className="w-5 h-5 text-gray-500" />
            )}
            {isChrome ? "Chrome Browser Detected" : "Non-Chrome Browser"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {loading ? (
            <span className="text-gray-400">Loading...</span>
          ) : (
            params?.browser_card ?? "The theme colors and UI behavior can switch based on browser type"
          )}
        </CardContent>
      </Card>

      {/* FEATURE CONFIG CARD */}
      <Card className="rounded-2xl p-1 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
        <div className="bg-white rounded-xl p-5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground mb-3">{message}</p>

            <Badge className="bg-purple-600 text-white px-3 py-1">
              {color}
            </Badge>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
