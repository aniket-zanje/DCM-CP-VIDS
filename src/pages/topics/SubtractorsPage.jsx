import React from 'react';
import StubTopicPage from '../../components/StubTopicPage';

export default function SubtractorsPage() {
  return (
    <StubTopicPage
      title="Subtractors"
      description="Half Subtractor and Full Subtractor combinational circuits."
      parentPath="/topics"
      parentTitle={null}
      subtopics={[
      { id: "half-sub", title: "Half Subtractor", path: "/topics/subtractors/half-sub" },
      { id: "full-sub", title: "Full Subtractor", path: "/topics/subtractors/full-sub" },
    ]}
    />
  );
}
