import React from 'react';
import StubTopicPage from '../../components/StubTopicPage';

export default function NumberSystemsPage() {
  return (
    <StubTopicPage
      title="Number Systems & Code Conversions"
      description="Positional radix systems, BCD, Gray code, Excess-3 and complement arithmetic."
      parentPath="/topics"
      parentTitle={null}
      subtopics={[
      { id: "bin-to-dec", title: "Binary to Decimal", path: "/topics/number-systems/bin-to-dec" },
      { id: "dec-to-bin", title: "Decimal to Binary", path: "/topics/number-systems/dec-to-bin" },
      { id: "bin-to-hex", title: "Binary to Hexadecimal", path: "/topics/number-systems/bin-to-hex" },
      { id: "hex-to-bin", title: "Hexadecimal to Binary", path: "/topics/number-systems/hex-to-bin" },
      { id: "bin-to-oct", title: "Binary to Octal", path: "/topics/number-systems/bin-to-oct" },
      { id: "oct-to-bin", title: "Octal to Binary", path: "/topics/number-systems/oct-to-bin" },
      { id: "dec-to-hex", title: "Decimal to Hexadecimal", path: "/topics/number-systems/dec-to-hex" },
      { id: "bcd", title: "BCD (8421 Code)", path: "/topics/number-systems/bcd" },
      { id: "gray-code", title: "Gray Code", path: "/topics/number-systems/gray-code" },
      { id: "excess-3", title: "Excess-3 Code", path: "/topics/number-systems/excess-3" },
    ]}
    />
  );
}
