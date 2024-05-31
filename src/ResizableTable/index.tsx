import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import classNames from "./ResizableTable.module.css";
import { DATA, HEADS, HeadItem } from '../data';

type ColumnWidth = {
    width: number;
    isTouched: boolean;
}

const ResizableTable: React.FC = () => {
    const [containerWidth, setContainerWith] = useState(0);

    const tableRef = useRef<HTMLDivElement | null>(null);
    const [columnWidths, setColumnWidths] = useState<ColumnWidth[]>(
        HEADS.map(() => ({ width: 0, isTouched: false}))
    );

    const updateSize = useCallback(() => {
        setContainerWith(tableRef.current!.clientWidth);
    }, [tableRef]);

    useLayoutEffect(() => {
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [tableRef, updateSize]);

    useEffect(() => {
        if (tableRef.current) {
            setColumnWidths((prev) => {
                return prev.map((col) => ({
                    ...col,
                    width: col.isTouched ? col.width : containerWidth / HEADS.length
                }));
            });
        }
    }, [containerWidth, tableRef, updateSize]);

    const isResizable = useCallback((resizable?: boolean) => {
        return typeof resizable === "undefined" ? true : resizable;
    }, []);

    const startResizing = useCallback((index: number, event: React.MouseEvent<HTMLSpanElement>, item: HeadItem) => {
        if (!isResizable(item.resizable)) return;

        const startX = event.clientX;
        const startWidth = columnWidths[index].width;

        const onMouseMove = (e: MouseEvent) => {
            const newWidth = startWidth + (e.clientX - startX);
            if (item.maxWidth && +item.maxWidth < newWidth) return;
            if (item.minWidth && +item.minWidth > newWidth) return;

            setColumnWidths((prevWidths) => {
                const updatedWidths = [...prevWidths];
                updatedWidths[index] = { isTouched: true, width: newWidth };
                return updatedWidths;
            });
            
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [columnWidths, isResizable]);

    return (
        <div className={classNames.TableContainer} ref={tableRef}>
           <div className={classNames.Table} >
                <div className={classNames.TableHead}>
                    <div className={classNames.Tr}>
                        {HEADS.map((header, index) => (
                            <div
                                key={header.id}
                                className={classNames.Th}
                                style={{ width: columnWidths[index].width }}
                            >
                                <span className={classNames.HeaderContent}>
                                    {header.label}
                                </span>
                                {isResizable(header.resizable) && (
                                    <span
                                        className={classNames.ResizeHandle}
                                        onMouseDown={(e) => startResizing(index, e, header)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={classNames.TableBody}>
                    {DATA.map(((data) => (
                        <div key={data.id} className={classNames.Tr}>
                            {HEADS.map((head, index) => (
                                <div
                                    key={head.id}
                                    style={{ width: columnWidths[index].width }}
                                    className={classNames.Td}
                                >
                                    {data[head.id]}
                                </div>
                            ))}
                        </div>
                    )))}
                </div>
            </div>
        </div>
    );
}

export default ResizableTable;
