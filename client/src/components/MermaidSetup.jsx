import React, { useEffect } from "react";
import mermaid from "mermaid";
import { useRef } from "react";

mermaid.initialize({
    startOnLoad: false,
    theme: "default"
})

const cleanMermaidChart = (diagram) => {

    if (!diagram) return "";

    let clean = diagram
        .replace(/\r\n/g, "\n")
        .replace(/[()]/g, "")
        .replace(/\//g, " ")
        .replace(/;/g, "")
        .trim();

    if (!clean.startsWith("graph")) {
        clean = `graph TD\n${clean}`;
    }

    return clean;
};

const autoFixBadNotes = (diagram) => {
    let index = 0;
    const used = new Map();
    return diagram.replace(/\[(.*?)\]/g, (match, label) => {
        const key = label.trim();

        if (used.has(key)) {
            return used.get(key);
        }

        index++;
        const id = `N${index}`;
        const node = `${id}["${key}"]`;

        used.set(key, node);
        return node;
    });
}
function MermaidSetup({ diagram }) {

    const containerRef = useRef(null);

    useEffect(() => {

        if (!diagram || !containerRef.current) return;

        const renderDiagram = async () => {

            try {

                containerRef.current.innerHTML = "";

                const uniqueId = `mermaid-${Math.random()
                    .toString(36)
                    .substring(2, 9)}`;

                // Sanitize before render
                const safeChart = autoFixBadNotes(cleanMermaidChart(diagram));

                const { svg } = await mermaid.render(uniqueId, safeChart);

                containerRef.current.innerHTML = svg;

            } catch (error) {

                console.error("Mermaid render failed:", error);

                // Fallback UI if Mermaid fails
                if (containerRef.current) {
                    containerRef.current.innerHTML = `
                        <div style="
                            padding:12px;
                            border:1px solid #e5e7eb;
                            border-radius:8px;
                            background:#f9fafb;
                            font-size:14px;
                            color:#6b7280;
                        ">
                            ⚠️ Diagram could not be rendered.
                        </div>
                    `;
                }

            }

        };

        renderDiagram();

    }, [diagram]);

    return (
        <div className='bg-white border rounded-lg p-4 overflow-x-auto'>
            <div ref={containerRef} />
        </div>
    );
}

export default MermaidSetup;