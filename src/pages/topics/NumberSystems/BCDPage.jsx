import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function BCDPage() {
  return (
    <StubTopicPage
      title="BCD (Binary Coded Decimal – 8421)"
      description="Represent each decimal digit using 4-bit binary groups."
      parentPath="/topics/number-systems"
      parentTitle="Number Systems"
      subtopics={[]}
    />
  );
}
