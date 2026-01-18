import { WidgetConnection } from "@/app/types";

/**
 * Calculate step numbers for widgets based on their connections.
 * Uses a topological approach where:
 * - Widgets with no incoming connections are step 1
 * - Each subsequent level gets the next step number
 * - Parallel widgets at the same depth share the same step number
 */
export function calculateWorkflowSteps(
  widgetIds: string[],
  connections: WidgetConnection[]
): Map<string, number> {
  const steps = new Map<string, number>();

  if (widgetIds.length === 0) return steps;

  // Build adjacency maps
  const incomingEdges = new Map<string, Set<string>>();
  const outgoingEdges = new Map<string, Set<string>>();

  // Initialize all widgets
  for (const widgetId of widgetIds) {
    incomingEdges.set(widgetId, new Set());
    outgoingEdges.set(widgetId, new Set());
  }

  // Populate edges from connections
  for (const conn of connections) {
    const incoming = incomingEdges.get(conn.targetWidgetId);
    const outgoing = outgoingEdges.get(conn.sourceWidgetId);

    if (incoming) incoming.add(conn.sourceWidgetId);
    if (outgoing) outgoing.add(conn.targetWidgetId);
  }

  // BFS to assign step numbers
  // Start with widgets that have no incoming edges (sources)
  const queue: string[] = [];
  const visited = new Set<string>();

  for (const widgetId of widgetIds) {
    const incoming = incomingEdges.get(widgetId);
    if (incoming && incoming.size === 0) {
      queue.push(widgetId);
      steps.set(widgetId, 1);
      visited.add(widgetId);
    }
  }

  // Process level by level
  while (queue.length > 0) {
    const current = queue.shift()!;
    const currentStep = steps.get(current) || 1;
    const outgoing = outgoingEdges.get(current);

    if (outgoing) {
      for (const targetId of outgoing) {
        if (!visited.has(targetId)) {
          // Calculate step as max of all incoming steps + 1
          const incoming = incomingEdges.get(targetId);
          let maxIncomingStep = 0;
          let allIncomingVisited = true;

          if (incoming) {
            for (const sourceId of incoming) {
              if (visited.has(sourceId)) {
                maxIncomingStep = Math.max(
                  maxIncomingStep,
                  steps.get(sourceId) || 0
                );
              } else {
                allIncomingVisited = false;
              }
            }
          }

          if (allIncomingVisited) {
            steps.set(targetId, maxIncomingStep + 1);
            visited.add(targetId);
            queue.push(targetId);
          }
        }
      }
    }
  }

  // Handle any unvisited widgets (disconnected or in cycles)
  // Give them a step number based on remaining unvisited
  let maxStep = Math.max(0, ...Array.from(steps.values()));
  for (const widgetId of widgetIds) {
    if (!visited.has(widgetId)) {
      maxStep++;
      steps.set(widgetId, maxStep);
    }
  }

  return steps;
}
