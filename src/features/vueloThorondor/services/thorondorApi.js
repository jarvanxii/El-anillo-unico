function normalizeBaseUrl(agent) {
  const raw = String(agent?.receiverUrl || "").trim();
  const host = String(agent?.hostIp || "").trim();
  const port = String(agent?.port || "").trim();

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw.replace(/\/$/, "");
  }

  if (host && port) {
    return `http://${host}:${port}`;
  }

  if (host) {
    return `http://${host}`;
  }

  return "";
}

export function buildThorondorAgentEndpoints(agent) {
  const baseUrl = normalizeBaseUrl(agent);

  return {
    baseUrl,
    healthUrl: `${baseUrl}/health`,
    telemetryUrl: `${baseUrl}/telemetry`,
    logsUrl: `${baseUrl}/logs`
  };
}

export async function fetchThorondorHealth(agent) {
  const endpoints = buildThorondorAgentEndpoints(agent);
  const response = await fetch(endpoints.healthUrl, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Health check fallida (${response.status})`);
  }

  return response.json();
}

export async function fetchThorondorTelemetry(agent) {
  const endpoints = buildThorondorAgentEndpoints(agent);
  const response = await fetch(endpoints.telemetryUrl, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Telemetry fallida (${response.status})`);
  }

  return response.json();
}

export function buildThorondorRequestRules(agent) {
  const endpoints = buildThorondorAgentEndpoints(agent);

  return [
    {
      id: `${agent.id}-health`,
      agentId: agent.id,
      type: "health",
      intervalSeconds: Math.max(15, Number(agent.intervalSeconds) || 30),
      method: "GET",
      url: endpoints.healthUrl,
      headers: {
        Accept: "application/json"
      }
    },
    {
      id: `${agent.id}-telemetry`,
      agentId: agent.id,
      type: "telemetry",
      intervalSeconds: Math.max(15, Number(agent.intervalSeconds) || 30),
      method: "GET",
      url: endpoints.telemetryUrl,
      headers: {
        Accept: "application/json"
      }
    }
  ];
}
