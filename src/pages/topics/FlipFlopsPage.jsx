import React from 'react';
import StubTopicPage from '../../components/StubTopicPage';

export default function FlipFlopsPage() {
  return (
    <StubTopicPage
      title="Flip-Flops"
      description="D, T, SR, JK and Master-Slave flip-flops."
      parentPath="/topics"
      parentTitle={null}
      subtopics={[
      { id: "d", title: "D Flip-Flop", path: "/topics/flip-flops/d" },
      { id: "t", title: "T Flip-Flop", path: "/topics/flip-flops/t" },
      { id: "sr", title: "SR Flip-Flop", path: "/topics/flip-flops/sr" },
      { id: "jk", title: "JK Flip-Flop", path: "/topics/flip-flops/jk" },
      { id: "master-slave", title: "Master-Slave Flip-Flop", path: "/topics/flip-flops/master-slave" },
    ]}
    />
  );
}
