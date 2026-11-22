import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function SISOPage() {
  return (
    <StubTopicPage
      title="SISO – Serial In Serial Out Register"
      description="Data enters and exits serially, one bit per clock pulse."
      parentPath="/topics/registers"
      parentTitle="Registers"
      subtopics={[]}
    />
  );
}
