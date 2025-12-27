import React from 'react'
import Card from '../ui/Card'

const KeyConcepts = () => {
  return (
    <section className="flex flex-col gap-3.5 mt-8">
      <h3 className="text-xl font-semibold text-gray-50">Key Concepts</h3>

      <div className="grid grid-cols-3 gap-4.5 max-[900px]:grid-cols-1">
        <Card>
          <p>This is a core idea explained briefly.</p>
        </Card>

        <Card>
          <p>Another important takeaway.</p>
        </Card>

        <Card>
          <p>One more concept worth remembering.</p>
        </Card>
      </div>
    </section>
  );
};

export default KeyConcepts;
