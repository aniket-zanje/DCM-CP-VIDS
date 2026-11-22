import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function BinToGrayPage() {
  return (
    <StubTopicPage
      title="Binary to Gray Code Converter"
      description="Convert binary code to Gray code using XOR between adjacent bits."
      parentPath="/topics/code-converters"
      parentTitle="Code Converters"
      subtopics={[]}
    />
  );
}
