import React from 'react';
import StubTopicPage from '../../components/StubTopicPage';

export default function CountersPage() {
  return (
    <StubTopicPage
      title="Counters"
      description="Synchronous and asynchronous up, down and up-down counters, plus ring, Johnson and mod counters."
      parentPath="/topics"
      parentTitle={null}
      subtopics={[
      { id: "sync-up", title: "Synchronous Up Counter", path: "/topics/counters/sync-up" },
      { id: "sync-down", title: "Synchronous Down Counter", path: "/topics/counters/sync-down" },
      { id: "async-up", title: "Asynchronous Up Counter", path: "/topics/counters/async-up" },
      { id: "async-down", title: "Asynchronous Down Counter", path: "/topics/counters/async-down" },
      { id: "sync-updown", title: "Synchronous Up-Down Counter", path: "/topics/counters/sync-updown" },
      { id: "async-updown", title: "Asynchronous Up-Down Counter", path: "/topics/counters/async-updown" },
      { id: "ring", title: "Ring Counter", path: "/topics/counters/ring" },
      { id: "johnson", title: "Johnson Counter", path: "/topics/counters/johnson" },
      { id: "mod", title: "Mod Counter", path: "/topics/counters/mod" },
    ]}
    />
  );
}
