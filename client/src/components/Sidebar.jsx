import React from "react";

//sidebar notes vale page pe lgega

function Sidebar({ result }) {

    if (!result || (
        !result.subTopics ||
        !result.questions ||
        !result.questions.short ||
        !result.questions.long ||
        !result.revisionPoints
    )) {
        return null;
    }

    return (
        <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-6'>
            <div className='flex items-center gap-2'>
                <span className='text-xl'>📌</span>
                <h3 className='text-lg font-semibold text-indigo-600'>Quick View</h3>
            </div>

            <section>
                <p className='text-sm font-semibold text-gray-700 mb-3'>
                    ⭐ Sub Topics (Priority Wise)
                </p>
                {
                    Object.entries(result.subTopics).map(([star, topics]) => (
                        <div key={star} className='mb-3 rounded-lg bg-gray-50 border border-gray-200 p-3'>
                            <p className='text-sm font-semibold text-yellow-600 mb-1'>
                                {star} Priority
                            </p>
                            <ul className='list-disc ml-4 text-sm text-gray-700 space-y-1'>
                                {topics.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                }
            </section>

            <section className='rounded-lg
            bg-yellow-50 border border-yellow-200 p-3'>
                <p className='text-sm font-semibold text-gray-700 mb-1'>
                    🔥Assessment-Focused Questions
                </p>
                <span className='text-yellow-700 font0bold text-sm'>{result.importance}</span>

                <p className='text-sm mt-2 font-semibold text-gray-700 mb-3'>❓Must Know Questions</p>

                <div className='mb-4 rounded-lg bg-indigo-50 border-indigo-200 p-3'>
                    <p className='text-sm font-medium text-indigo-700 mb-2'>
                        Short Questions
                    </p>
                    <ul className='list-disc ml-4 text-sm text-gray-700 space-y-1'>
                        {result.questions.short.map((t, i) => (
                            <li key={i}>{t}</li>
                        ))}
                    </ul>
                </div>

                <div className='mb-4 rounded-lg bg-purple-50 border-purple-200 p-3'>
                    <p className='text-sm font-medium text-purple-700 mb-2'>
                        Long Questions
                    </p>
                    <ul className='list-disc ml-4 text-sm text-gray-700 space-y-1'>
                        {result.questions.long.map((t, i) => (
                            <li key={i}>{t}</li>
                        ))}
                    </ul>
                </div>

                <div className='mb-4 rounded-lg bg-blue-50 border-blue-200 p-3'>
                    <p className='text-sm font-medium text-blue-700 mb-2'>
                        Diagram Questions
                    </p>
                    <ul className='list-disc ml-4 text-sm text-gray-700 space-y-1'>
                        <li>{result.questions.diagram}</li>
                    </ul>
                </div>

            </section>

        </div>
    )
}

export default Sidebar;