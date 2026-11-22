import React from 'react';
import StubTopicPage from '../../components/StubTopicPage';

export default function AddersPage() {
  return (
    <StubTopicPage
      title="Adders"
      description="Half Adder and Full Adder combinational circuits."
      parentPath="/topics"
      parentTitle={null}
      subtopics={[
      { id: "half-adder", title: "Half Adder", path: "/topics/adders/half-adder" },
      { id: "full-adder", title: "Full Adder", path: "/topics/adders/full-adder" },
    ]}
    />
  );
}
