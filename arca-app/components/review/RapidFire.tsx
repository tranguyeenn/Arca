import React from 'react'
import Card from '../ui/Card'

const RapidFire = () => {
  return (
    <section className="flex flex-col gap-3.5">
      <h3 className="text-xl font-semibold text-gray-50">Rapid Fire</h3>

      <div className="grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-1">
        <Card>
          <p>Short question prompt goes here.</p>
          <span className="absolute bottom-3.5 right-3.5 text-xs font-semibold text-red-500">Hard</span>
        </Card>

        <Card>
          <p>Another question with more context.</p>
          <span className="absolute bottom-3.5 right-3.5 text-xs font-semibold text-green-500">Easy</span>
        </Card>

        <Card>
          <p>Third rapid-fire concept.</p>
        </Card>
      </div>
    </section>
  );
};

export default RapidFire;
