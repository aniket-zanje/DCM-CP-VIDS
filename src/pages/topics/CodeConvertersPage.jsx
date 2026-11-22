import React from 'react';
import StubTopicPage from '../../components/StubTopicPage';

export default function CodeConvertersPage() {
  return (
    <StubTopicPage
      title="Code Converters"
      description="Binary to Gray, Gray to Binary, and Excess-3 to BCD conversions."
      parentPath="/topics"
      parentTitle={null}
      subtopics={[
      { id: "bin-to-gray", title: "Binary to Gray Code", path: "/topics/code-converters/bin-to-gray" },
      { id: "gray-to-bin", title: "Gray Code to Binary", path: "/topics/code-converters/gray-to-bin" },
      { id: "xs3-to-bcd", title: "Excess-3 to BCD", path: "/topics/code-converters/xs3-to-bcd" },
      { id: "bcd-to-xs3", title: "BCD to Excess-3", path: "/topics/code-converters/bcd-to-xs3" },
    ]}
    />
  );
}
