import React from 'react';
import StubTopicPage from '../../components/StubTopicPage';

export default function LogicGatesPage() {
  return (
    <StubTopicPage
      title="Logic Gates"
      description="AND, OR, NOT, NAND, NOR, XOR, XNOR and Universal Gates."
      parentPath="/topics"
      parentTitle={null}
      subtopics={[
      { id: "and", title: "AND Gate", path: "/topics/logic-gates/and" },
      { id: "or", title: "OR Gate", path: "/topics/logic-gates/or" },
      { id: "not", title: "NOT Gate", path: "/topics/logic-gates/not" },
      { id: "nand", title: "NAND Gate", path: "/topics/logic-gates/nand" },
      { id: "nor", title: "NOR Gate", path: "/topics/logic-gates/nor" },
      { id: "xor", title: "XOR Gate", path: "/topics/logic-gates/xor" },
      { id: "xnor", title: "XNOR Gate", path: "/topics/logic-gates/xnor" },
      { id: "universal", title: "Universal Gates", path: "/topics/logic-gates/universal" },
    ]}
    />
  );
}
