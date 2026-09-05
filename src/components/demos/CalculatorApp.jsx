import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Clean Inline SVG Icons
const Icons = {
  History: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v5h5"></path>
      <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path>
      <path d="M12 7v5l4 2"></path>
    </svg>
  ),
  Backspace: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
      <line x1="18" y1="9" x2="12" y2="15"></line>
      <line x1="12" y1="9" x2="18" y2="15"></line>
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  ),
  Flask: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22h12a2 2 0 0 0 2-2V10l-4-8H8L4 10v10a2 2 0 0 0 2 2z"></path>
      <line x1="6" y1="10" x2="18" y2="10"></line>
    </svg>
  ),
  Graph: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  EyeOff: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  )
};

const COLOR_PALETTE = ['#0d6efd', '#dc3545', '#198754', '#fd7e14', '#6f42c1', '#20c997'];

export default function CalculatorApp() {
  const [activeTab, setActiveTab] = useState('standard');
  const [input, setInput] = useState('');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isScientific, setIsScientific] = useState(false);

  const [hoveredPointId, setHoveredPointId] = useState(null);

  // Added `visible: true` property to equation state
  const [equations, setEquations] = useState([
    { id: '1', expr: 'x + 1', color: COLOR_PALETTE[0], visible: true },
    { id: '2', expr: 'x^2', color: COLOR_PALETTE[1], visible: true }
  ]);

  const handleAppend = useCallback((val) => {
    setInput((prev) => prev + val);
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setExpression('');
  }, []);

  const handleBackspace = useCallback(() => {
    setInput((prev) => prev.slice(0, -1));
  }, []);

  const handleCalculate = useCallback(() => {
    if (!input) return;
    try {
      let evalExpr = input
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**');

      const resultValue = Function(`"use strict"; return (${evalExpr})`)();
      const formattedResult = Number.isFinite(resultValue) ? resultValue.toString() : 'Error';

      setExpression(`${input} =`);
      
      if (formattedResult !== 'Error') {
        setHistory((prev) => [{ req: input, res: formattedResult }, ...prev.slice(0, 9)]);
        setInput(formattedResult);
      } else {
        setInput('Error');
      }
    } catch {
      setInput('Error');
    }
  }, [input]);

  useEffect(() => {
    if (activeTab !== 'standard') return;

    const handleKeyDown = (e) => {
      const key = e.key;
      if (/[0-9.]/.test(key)) handleAppend(key);
      else if (key === '+') handleAppend('+');
      else if (key === '-') handleAppend('-');
      else if (key === '*') handleAppend('×');
      else if (key === '/') handleAppend('÷');
      else if (key === 'Enter') { e.preventDefault(); handleCalculate(); }
      else if (key === 'Backspace') handleBackspace();
      else if (key === 'Escape') handleClear();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, handleAppend, handleCalculate, handleBackspace, handleClear]);

  const handleAddEquation = () => {
    const nextColor = COLOR_PALETTE[equations.length % COLOR_PALETTE.length];
    setEquations((prev) => [
      ...prev,
      { id: Date.now().toString(), expr: 'x', color: nextColor, visible: true }
    ]);
  };

  const handleUpdateEquation = (id, newExpr) => {
    setEquations((prev) =>
      prev.map((eq) => (eq.id === id ? { ...eq, expr: newExpr } : eq))
    );
  };

  const handleToggleVisibility = (id) => {
    setEquations((prev) =>
      prev.map((eq) => (eq.id === id ? { ...eq, visible: !eq.visible } : eq))
    );
  };

  const handleRemoveEquation = (id) => {
    if (equations.length === 1) return;
    setEquations((prev) => prev.filter((eq) => eq.id !== id));
  };

  const evaluateGraphY = useCallback((eqStr, xVal) => {
    try {
      let sanitized = eqStr
        .replace(/(\d)x/gi, '$1*x')
        .replace(/\^/g, '**')
        .replace(/sin\(/gi, 'Math.sin(')
        .replace(/cos\(/gi, 'Math.cos(')
        .replace(/tan\(/gi, 'Math.tan(')
        .replace(/sqrt\(/gi, 'Math.sqrt(')
        .replace(/abs\(/gi, 'Math.abs(')
        .replace(/π/g, 'Math.PI')
        .replace(/e/gi, 'Math.E');

      sanitized = sanitized.replace(/x/gi, `(${xVal})`);
      const yVal = Function(`"use strict"; return (${sanitized})`)();
      return Number.isFinite(yVal) ? yVal : null;
    } catch {
      return null;
    }
  }, []);

  const { plottedPaths, intersections } = useMemo(() => {
    const width = 360;
    const height = 300;
    const xMin = -10;
    const xMax = 10;
    const yMin = -10;
    const yMax = 10;
    const step = 0.05;

    const toSvgX = (x) => ((x - xMin) / (xMax - xMin)) * width;
    const toSvgY = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

    const paths = equations.map((eq) => {
      // Skip path generation if marked invisible
      if (!eq.visible) return { id: eq.id, pathStr: '', color: eq.color };

      let points = [];
      let fullPath = '';
      for (let x = xMin; x <= xMax; x += step) {
        const y = evaluateGraphY(eq.expr, x);
        if (y !== null && y >= yMin - 15 && y <= yMax + 15) {
          const svgX = toSvgX(x).toFixed(1);
          const svgY = toSvgY(y).toFixed(1);
          points.push(`${points.length === 0 ? 'M' : 'L'}${svgX},${svgY}`);
        } else {
          if (points.length > 0) {
            fullPath += points.join(' ') + ' ';
            points = [];
          }
        }
      }
      if (points.length > 0) fullPath += points.join(' ');
      return { id: eq.id, pathStr: fullPath, color: eq.color };
    });

    // Intersection calculations remain active for ALL equations
    const pointsList = [];
    if (equations.length > 1) {
      for (let i = 0; i < equations.length; i++) {
        for (let j = i + 1; j < equations.length; j++) {
          const eq1 = equations[i];
          const eq2 = equations[j];

          let prevX = xMin;
          let prevDiff = (evaluateGraphY(eq1.expr, prevX) ?? 0) - (evaluateGraphY(eq2.expr, prevX) ?? 0);

          for (let x = xMin + step; x <= xMax; x += step) {
            const y1 = evaluateGraphY(eq1.expr, x);
            const y2 = evaluateGraphY(eq2.expr, x);

            if (y1 === null || y2 === null) continue;

            const currDiff = y1 - y2;

            if (prevDiff * currDiff <= 0 && prevDiff !== currDiff) {
              let low = prevX;
              let high = x;
              let midX = (low + high) / 2;

              for (let k = 0; k < 10; k++) {
                midX = (low + high) / 2;
                const mY1 = evaluateGraphY(eq1.expr, midX);
                const mY2 = evaluateGraphY(eq2.expr, midX);
                if (mY1 === null || mY2 === null) break;
                const mDiff = mY1 - mY2;

                if (prevDiff * mDiff <= 0) high = midX;
                else low = midX;
              }

              const intersectX = midX;
              const intersectY = evaluateGraphY(eq1.expr, intersectX);

              if (
                intersectY !== null &&
                intersectX >= xMin &&
                intersectX <= xMax &&
                intersectY >= yMin &&
                intersectY <= yMax
              ) {
                pointsList.push({
                  id: `pt-${i}-${j}-${intersectX.toFixed(2)}`,
                  x: intersectX,
                  y: intersectY,
                  svgX: toSvgX(intersectX),
                  svgY: toSvgY(intersectY),
                  functions: [
                    `f${i + 1}(x) = ${eq1.expr}`,
                    `f${j + 1}(x) = ${eq2.expr}`
                  ]
                });
              }
            }
            prevX = x;
            prevDiff = currDiff;
          }
        }
      }
    }

    return { plottedPaths: paths, intersections: pointsList };
  }, [equations, evaluateGraphY]);

  return (
    <div className="container py-2" style={{ maxWidth: '640px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="btn-group p-1 bg-light border rounded-pill">
          <button
            className={`btn btn-sm rounded-pill px-3 fw-bold ${activeTab === 'standard' ? 'btn-primary shadow-sm' : 'btn-light text-secondary'}`}
            onClick={() => setActiveTab('standard')}
          >
            Kalkulator
          </button>
          <button
            className={`btn btn-sm rounded-pill px-3 fw-bold d-flex align-items-center gap-1 ${activeTab === 'graphic' ? 'btn-primary shadow-sm' : 'btn-light text-secondary'}`}
            onClick={() => setActiveTab('graphic')}
          >
            <Icons.Graph /> Grafik
          </button>
        </div>

        {activeTab === 'standard' && (
          <div className="d-flex gap-2">
            <button 
              className={`btn btn-sm d-flex align-items-center gap-1 ${isScientific ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setIsScientific(!isScientific)}
              title="Toggle Sains Mode"
            >
              <Icons.Flask /> <span className="d-none d-sm-inline">Sains</span>
            </button>
            <button 
              className={`btn btn-sm d-flex align-items-center gap-1 ${showHistory ? 'btn-secondary' : 'btn-outline-secondary'}`}
              onClick={() => setShowHistory(!showHistory)}
              title="Riwayat Perhitungan"
            >
              <Icons.History /> <span className="d-none d-sm-inline">Riwayat</span>
            </button>
          </div>
        )}
      </div>

      {activeTab === 'standard' && (
        <div className="row g-3">
          <div className={showHistory ? "col-md-7" : "col-12"}>
            <div className="card border-0 shadow-sm p-3 bg-light rounded-4">
              <div className="p-3 bg-white border rounded-3 text-end mb-3 shadow-sm" style={{ minHeight: '80px' }}>
                <div className="text-muted small mb-1 style-italic" style={{ minHeight: '20px' }}>
                  {expression}
                </div>
                <div className="fs-3 fw-bold text-dark text-break">
                  {input || '0'}
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                {isScientific && (
                  <div className="row row-cols-4 g-1 mb-1">
                    {['sin(', 'cos(', 'tan(', 'sqrt(', 'π', 'e', '^', '('].map((fn) => (
                      <div className="col" key={fn}>
                        <button 
                          className="btn btn-sm btn-outline-info w-100 fw-bold py-2"
                          onClick={() => handleAppend(fn)}
                        >
                          {fn}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="row row-cols-4 g-2">
                  <div className="col">
                    <button className="btn btn-danger w-100 py-2 fs-5 fw-bold" onClick={handleClear}>C</button>
                  </div>
                  
                  <div className="col">
                    <button 
                      className="btn btn-secondary w-100 py-2 h-100 d-flex justify-content-center align-items-center" 
                      onClick={handleBackspace}
                      title="Hapus"
                    >
                      <Icons.Backspace />
                    </button>
                  </div>

                  <div className="col">
                    <button className="btn btn-outline-dark bg-white w-100 py-2 fs-5 fw-bold" onClick={() => handleAppend('(')}>(</button>
                  </div>
                  <div className="col">
                    <button className="btn btn-warning w-100 py-2 fs-5 fw-bold text-white" onClick={() => handleAppend('÷')}>÷</button>
                  </div>

                  {['7', '8', '9'].map((char) => (
                    <div className="col" key={char}>
                      <button className="btn btn-outline-dark w-100 py-2 fs-5 fw-bold bg-white" onClick={() => handleAppend(char)}>{char}</button>
                    </div>
                  ))}
                  <div className="col">
                    <button className="btn btn-warning w-100 py-2 fs-5 fw-bold text-white" onClick={() => handleAppend('×')}>×</button>
                  </div>

                  {['4', '5', '6'].map((char) => (
                    <div className="col" key={char}>
                      <button className="btn btn-outline-dark w-100 py-2 fs-5 fw-bold bg-white" onClick={() => handleAppend(char)}>{char}</button>
                    </div>
                  ))}
                  <div className="col">
                    <button className="btn btn-warning w-100 py-2 fs-5 fw-bold text-white" onClick={() => handleAppend('-')}>-</button>
                  </div>

                  {['1', '2', '3'].map((char) => (
                    <div className="col" key={char}>
                      <button className="btn btn-outline-dark w-100 py-2 fs-5 fw-bold bg-white" onClick={() => handleAppend(char)}>{char}</button>
                    </div>
                  ))}
                  <div className="col">
                    <button className="btn btn-warning w-100 py-2 fs-5 fw-bold text-white" onClick={() => handleAppend('+')}>+</button>
                  </div>

                  <div className="col">
                    <button className="btn btn-outline-dark w-100 py-2 fs-5 fw-bold bg-white" onClick={() => handleAppend(')')}>)</button>
                  </div>
                  <div className="col">
                    <button className="btn btn-outline-dark w-100 py-2 fs-5 fw-bold bg-white" onClick={() => handleAppend('0')}>0</button>
                  </div>
                  <div className="col">
                    <button className="btn btn-outline-dark w-100 py-2 fs-5 fw-bold bg-white" onClick={() => handleAppend('.')}>.</button>
                  </div>
                  <div className="col">
                    <button className="btn btn-success w-100 py-2 fs-5 fw-bold" onClick={handleCalculate}>=</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showHistory && (
            <div className="col-md-5">
              <div className="card border-0 shadow-sm p-3 bg-white h-100 rounded-4">
                <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                  <span className="fw-bold text-secondary d-flex align-items-center gap-1">
                    <Icons.History /> Riwayat
                  </span>
                  {history.length > 0 && (
                    <button 
                      className="btn btn-link text-danger p-0 text-decoration-none d-flex align-items-center gap-1 small"
                      onClick={() => setHistory([])}
                    >
                      <Icons.Trash /> Bersihkan
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <p className="text-muted small italic my-auto text-center py-4">Belum ada riwayat kalkulasi.</p>
                ) : (
                  <div className="list-group list-group-flush overflow-auto" style={{ maxHeight: '300px' }}>
                    {history.map((item, idx) => (
                      <button
                        key={idx}
                        className="list-group-item list-group-item-action text-end py-2 px-1 border-0 border-bottom"
                        onClick={() => {
                          setInput(item.res);
                          setExpression(`${item.req} =`);
                        }}
                      >
                        <div className="text-muted small">{item.req} =</div>
                        <div className="fw-bold text-primary fs-6">{item.res}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'graphic' && (
        <div className="card border-0 shadow-sm p-3 bg-light rounded-4">
          <div className="row g-3">
            <div className="col-md-5 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0 text-primary">Daftar Persamaan</h6>
                <button
                  className="btn btn-primary btn-sm d-flex align-items-center gap-1 rounded-pill px-2"
                  onClick={handleAddEquation}
                >
                  <Icons.Plus /> Tambah
                </button>
              </div>

              <div
                className="overflow-y-auto pe-1 flex-grow-1 d-flex flex-column gap-2 mb-2"
                style={{ maxHeight: '280px', minHeight: '180px' }}
              >
                {equations.map((eq, index) => (
                  <div key={eq.id} className="card p-2 border-0 bg-white shadow-sm rounded-3">
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className="rounded-circle flex-shrink-0"
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: eq.color,
                          opacity: eq.visible ? 1 : 0.3
                        }}
                      ></span>
                      <span className="fw-bold text-secondary">f{index + 1}(x) =</span>
                      <input
                        type="text"
                        className="form-control form-control-sm border-0 bg-light fw-bold text-dark"
                        value={eq.expr}
                        onChange={(e) => handleUpdateEquation(eq.id, e.target.value)}
                        placeholder="Contoh: x + 1, x^2 - 4"
                      />
                      {/* Show/Hide Toggle Button */}
                      <button
                        className={`btn btn-sm border-0 p-1 ${eq.visible ? 'text-primary' : 'text-muted'}`}
                        onClick={() => handleToggleVisibility(eq.id)}
                        title={eq.visible ? "Sembunyikan Garis" : "Tampilkan Garis"}
                      >
                        {eq.visible ? <Icons.Eye /> : <Icons.EyeOff />}
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm border-0 p-1"
                        onClick={() => handleRemoveEquation(eq.id)}
                        disabled={equations.length === 1}
                        title="Hapus Persamaan"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-muted small bg-white p-2 border rounded-3 mt-auto">
                <strong>Tips Format:</strong> <code>x^2</code> (kuadrat), <code>sin(x)</code>, <code>sqrt(x)</code>, <code>2*x + 3</code>.
              </div>
            </div>

            <div className="col-md-7">
              <div className="bg-white border rounded-3 p-2 shadow-sm text-center position-relative">
                <svg
                  viewBox="0 0 360 300"
                  className="w-100 h-auto"
                  style={{ maxHeight: '300px', background: '#fafafa' }}
                >
                  {[-8, -6, -4, -2, 2, 4, 6, 8].map((val) => {
                    const x = ((val + 10) / 20) * 360;
                    const y = 300 - ((val + 10) / 20) * 300;
                    return (
                      <g key={val}>
                        <line x1={x} y1="0" x2={x} y2="300" stroke="#eee" strokeWidth="1" />
                        <line x1="0" y1={y} x2="360" y2={y} stroke="#eee" strokeWidth="1" />
                      </g>
                    );
                  })}

                  <line x1="180" y1="0" x2="180" y2="300" stroke="#6c757d" strokeWidth="2" />
                  <line x1="0" y1="150" x2="360" y2="150" stroke="#6c757d" strokeWidth="2" />

                  <text x="345" y="142" fontSize="10" fill="#6c757d" fontWeight="bold">X</text>
                  <text x="186" y="14" fontSize="10" fill="#6c757d" fontWeight="bold">Y</text>

                  {plottedPaths.map(
                    (p) =>
                      p.pathStr && (
                        <path
                          key={p.id}
                          d={p.pathStr}
                          fill="none"
                          stroke={p.color}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      )
                  )}

                  {intersections.map((pt) => {
                    const isHovered = hoveredPointId === pt.id;
                    const tooltipX = Math.min(Math.max(pt.svgX, 80), 280);
                    const tooltipY = pt.svgY < 70 ? pt.svgY + 25 : pt.svgY - 45;

                    return (
                      <g
                        key={pt.id}
                        onMouseEnter={() => setHoveredPointId(pt.id)}
                        onMouseLeave={() => setHoveredPointId(null)}
                        style={{ cursor: 'pointer' }}
                      >
                        <circle
                          cx={pt.svgX}
                          cy={pt.svgY}
                          r={isHovered ? "6" : "4.5"}
                          fill="#dc3545"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />

                        {!isHovered && (
                          <text
                            x={pt.svgX}
                            y={pt.svgY - 8}
                            textAnchor="middle"
                            fontSize="9"
                            fontWeight="bold"
                            fill="#212529"
                            style={{ pointerEvents: 'none' }}
                          >
                            ({pt.x.toFixed(1)}, {pt.y.toFixed(1)})
                          </text>
                        )}

                        {isHovered && (
                          <g style={{ pointerEvents: 'none' }}>
                            <rect
                              x={tooltipX - 65}
                              y={tooltipY}
                              width="130"
                              height={30 + pt.functions.length * 12}
                              rx="6"
                              fill="#212529"
                              fillOpacity="0.9"
                            />
                            <text
                              x={tooltipX}
                              y={tooltipY + 14}
                              textAnchor="middle"
                              fontSize="9"
                              fontWeight="bold"
                              fill="#0d6efd"
                            >
                              ({pt.x.toFixed(2)}, {pt.y.toFixed(2)})
                            </text>
                            {pt.functions.map((fnStr, idx) => (
                              <text
                                key={idx}
                                x={tooltipX}
                                y={tooltipY + 28 + idx * 12}
                                textAnchor="middle"
                                fontSize="8"
                                fill="#ffffff"
                              >
                                {fnStr}
                              </text>
                            ))}
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}