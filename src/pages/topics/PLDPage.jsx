import React from 'react';
import StubTopicPage from '../../components/StubTopicPage';

export default function PLDPage() {
  return (
    <StubTopicPage
      title="Programmable Logic Devices"
      description="PLA (Programmable Logic Array) and PAL (Programmable Array Logic)."
      parentPath="/topics"
      parentTitle={null}
      subtopics={[
      { id: "pla", title: "PLA – Programmable Logic Array", path: "/topics/pld/pla" },
      { id: "pal", title: "PAL – Programmable Array Logic", path: "/topics/pld/pal" },
    ]}
    />
  );
}
