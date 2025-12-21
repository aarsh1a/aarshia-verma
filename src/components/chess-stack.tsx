"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";

interface ChessStackProps {
    delay?: number;
}

interface ChessPiece {
    symbol: string;
    name: string;
    role: string;
    description: string;
    items: string[];
    relatedProjects?: string[];
    size: string; // piece size class
}

const pieces: Record<string, ChessPiece> = {
    pawn: {
        symbol: "♟",
        name: "Pawn",
        role: "fundamentals",
        description: "The foundation. These are the tools I reach for without thinking — muscle memory.",
        items: ["Python", "Git", "Linux", "VS Code"],
        relatedProjects: ["Every project starts here"],
        size: "text-2xl",
    },
    knight: {
        symbol: "♞",
        name: "Knight",
        role: "experimentation",
        description: "I use these to explore ideas before they harden into systems. Non-linear moves.",
        items: ["FastAPI", "Flask", "LangChain", "Jupyter"],
        relatedProjects: ["Early prototypes", "Research demos", "Rapid validation"],
        size: "text-3xl",
    },
    bishop: {
        symbol: "♝",
        name: "Bishop",
        role: "abstraction",
        description: "Long-range tools for seeing patterns across the board. Data becomes insight.",
        items: ["NumPy", "Pandas", "PyTorch", "Scikit-learn"],
        relatedProjects: ["ML pipelines", "Data analysis"],
        size: "text-3xl",
    },
    rook: {
        symbol: "♜",
        name: "Rook",
        role: "systems",
        description: "Straight lines. Predictable power. These keep everything running.",
        items: ["Docker", "Kubernetes", "PostgreSQL", "Redis"],
        relatedProjects: ["Production deployments", "Infrastructure"],
        size: "text-3xl",
    },
    queen: {
        symbol: "♛",
        name: "Queen",
        role: "synthesis",
        description: "The most versatile piece. Where everything comes together.",
        items: ["LLMs", "RAG pipelines", "Transformers", "Vector DBs"],
        relatedProjects: ["AI applications", "Research projects"],
        size: "text-4xl",
    },
    king: {
        symbol: "♚",
        name: "King",
        role: "principles",
        description: "Tools change. Principles don't.",
        items: ["Correctness", "Interpretability", "Systems thinking", "Simplicity"],
        size: "text-4xl font-bold",
    },
};

// 4x4 board layout - null means empty square
const boardLayout: (keyof typeof pieces | null)[][] = [
    ["rook", null, "knight", null],
    [null, "pawn", null, "bishop"],
    ["queen", null, null, null],
    [null, "king", null, "pawn"],
];

const isLightSquare = (row: number, col: number) => (row + col) % 2 === 0;

export const ChessStack = ({ delay = 0 }: ChessStackProps) => {
    const [selectedPiece, setSelectedPiece] = useState<keyof typeof pieces | null>(null);
    const [hoveredPiece, setHoveredPiece] = useState<keyof typeof pieces | null>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const handlePieceClick = (piece: keyof typeof pieces) => {
        setSelectedPiece(selectedPiece === piece ? null : piece);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: delay, duration: 0.5 }}
            className="w-full"
        >
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-xl font-bold mb-2">how i work</h2>
                <p className="text-sm text-muted-foreground">(click to explore)</p>
            </div>

            {/* Main content area */}
            <div className="flex justify-center items-start gap-8">
                {/* Chess Board */}
                <div className="relative">
                    {/* Paper texture background */}
                    <div
                        className="absolute inset-0 rounded-lg opacity-[0.03]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    <div
                        className="grid grid-cols-4 rounded-lg overflow-hidden relative"
                        style={{
                            width: "300px",
                            height: "300px",
                            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
                        }}
                    >
                        {boardLayout.map((row, rowIndex) =>
                            row.map((piece, colIndex) => {
                                const isLight = isLightSquare(rowIndex, colIndex);
                                const hasPiece = piece !== null;
                                const isSelected = selectedPiece === piece;
                                const isHovered = hoveredPiece === piece;

                                return (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`
                      relative flex items-center justify-center
                      ${hasPiece ? "cursor-pointer" : ""}
                      transition-colors duration-200
                    `}
                                        style={{
                                            width: "75px",
                                            height: "75px",
                                            backgroundColor: isLight
                                                ? "rgba(255, 253, 245, 0.04)"
                                                : "rgba(20, 20, 18, 0.5)",
                                            backgroundImage: !isLight
                                                ? `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`
                                                : "none",
                                            opacity: selectedPiece && !isSelected ? 0.85 : 1,
                                        }}
                                        onMouseEnter={() => hasPiece && setHoveredPiece(piece)}
                                        onMouseLeave={() => setHoveredPiece(null)}
                                        onClick={() => hasPiece && handlePieceClick(piece)}
                                    >
                                        {/* Focus ring for selected piece */}
                                        {isSelected && (
                                            <div className="absolute inset-1 rounded border border-white/20" />
                                        )}

                                        {hasPiece && (
                                            <span
                                                className={`
                          select-none
                          ${pieces[piece].size}
                          ${isSelected ? "text-white" : ""}
                          ${isHovered && !isSelected ? "text-white/85" : "text-white/70"}
                          ${piece === "king" ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : ""}
                          transition-colors duration-200
                        `}
                                            >
                                                {pieces[piece].symbol}
                                            </span>
                                        )}

                                        {/* Hover label - appears on piece */}
                                        <AnimatePresence>
                                            {isHovered && !selectedPiece && hasPiece && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                                                >
                                                    <span className="text-xs text-white/60 italic">
                                                        {pieces[piece].role}
                                                    </span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Caption */}
                    <p className="text-xs text-muted-foreground/40 text-center mt-8 tracking-wide">
                        some squares remain unplayed
                    </p>
                </div>

                {/* Side Panel */}
                <AnimatePresence>
                    {selectedPiece && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-[350px]"
                        >
                            <div className="relative border border-white/10 rounded-lg p-6 bg-white/[0.02]">
                                {/* Close button */}
                                <button
                                    onClick={() => setSelectedPiece(null)}
                                    className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors"
                                >
                                    <X size={14} />
                                </button>

                                {/* Piece header */}
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                                    <span className="text-2xl">{pieces[selectedPiece].symbol}</span>
                                    <div>
                                        <h3 className="font-medium text-white/90">{pieces[selectedPiece].role}</h3>
                                        <p className="text-xs text-muted-foreground/60">{pieces[selectedPiece].name}</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground/80 mb-6 leading-relaxed">
                                    {pieces[selectedPiece].description}
                                </p>

                                {/* Items */}
                                <div className="mb-6">
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-3">
                                        {selectedPiece === "king" ? "Principles" : "Tools"}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {pieces[selectedPiece].items.map((item) => (
                                            <span
                                                key={item}
                                                className="text-xs px-2.5 py-1 bg-white/[0.03] border border-white/10 rounded-sm text-white/60"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Related projects - not shown for King */}
                                {pieces[selectedPiece].relatedProjects && (
                                    <div>
                                        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">
                                            Used in
                                        </p>
                                        <ul className="space-y-1">
                                            {pieces[selectedPiece].relatedProjects?.map((project) => (
                                                <li key={project} className="text-xs text-muted-foreground/60">
                                                    – {project}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* King footnote */}
                                {selectedPiece === "king" && (
                                    <p className="text-[10px] text-white/20 mt-6 italic">
                                        ¹ tools change, principles don&apos;t
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ChessStack;
