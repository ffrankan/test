import { FC, useRef, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Document, Page, pdfjs } from'react-pdf';
import { Button, message } from 'antd';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const PdfViewer: FC = () => {
    const [pdfUrl, setPdfUrl] = useState<string>('public/test.pdf');
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    // 处理PDF加载成功
    const onLoadSuccess = ({ numPages }: any) => {
        setNumPages(numPages);
    };

    // 处理页面点击事件
    const onPdfElementClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        console.log(e, '----',target)
        // if (target && target.classList.contains('pdf-interactive')) {
        //     message.info('PDF元素被点击!');
        //     // 可以在这里处理交互逻辑，比如跳转到其他页面、显示更多内容等
        // }
    };

    return (
        <Container>
            <div className="pdf-container" onClick={onPdfElementClick}>
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            </div>
            <div className="pdf-toolbar">
                <Button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
                    上一页
                </Button>
                <Button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>
                    下一页
                </Button>
            </div>
        </Container>
    );
};

export default PdfViewer;

// const PdfView: FC = () => {
//     const [numPages, setNumPages] = useState(null);
//     const [scale, setScale] = useState(2);
//     const canvasRefs = useRef<HTMLCanvasElement[]>([]);
//     const pdfUrl = 'public/test.pdf';
//
//     const onPageLoadSuccess = (pdf): void => {
//         setNumPages(pdf._pdfInfo.numPages);
//
//     };
//
//     const handleCanvasClick = (event, numPages) => {
//         console.log('handleCanvasClick', event)
//         console.log(canvasRefs, 'rrrrr')
//
//         if (canvasRefs.current) {
//             const rect = canvasRefs.current.getBoundingClientRect();
//             const x = event.clientX - rect.left;
//             const y = event.clientY - rect.top;
//             console.log(`Clicked on page ${numPages} at coordinates: (${x}, ${y})`);
//         }
//     };
//
//     const onPageRenderSuccess = (pageIndex, result) => {
//         // 确保获取到的是原生的 HTMLCanvasElement
//         const nativeCanvas = result.canvas as HTMLCanvasElement;
//         //console.log('Page rendered', pageIndex, result)
//         canvasRefs.current[pageIndex] = nativeCanvas;
//         nativeCanvas && nativeCanvas.addEventListener('click', (event) => handleCanvasClick(event, pageIndex));
//         return () => {
//             nativeCanvas.removeEventListener('click', (event) => handleCanvasClick(event, pageIndex));
//         };
//     };
//
//     useEffect(() => {
//         const canvas = canvasRefs.current;
//         if (canvas) {
//             canvas.addEventListener('click', handleCanvasClick);
//             return () => {
//                 canvas.removeEventListener('click', handleCanvasClick);
//             };
//         }
//     }, [])
//
//     return (
//         <Container ref={canvasRefs as any}>
//             <Document
//                 file={pdfUrl}
//                 onLoadSuccess={onPageLoadSuccess}
//             >
//                 {numPages && Array.from(new Array(numPages), (_, index) => (
//                     <Page
//                         key={index + 'page'}
//                         pageNumber={index + 1}
//                         scale={scale}
//                         //canvasRef={canvasRefs}
//                         // onRenderSuccess={(result) => onPageRenderSuccess(index, result)}
//                     />
//                 ))}
//             </Document>
//         </Container>
//     );
// };
//export default PdfView;
