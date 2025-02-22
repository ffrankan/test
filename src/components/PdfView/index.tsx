import { FC, useRef, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Document, Page, pdfjs, Outline } from'react-pdf';
import { Button, message } from 'antd';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  .pdf-toolbar {
    position: fixed; // 固定定位
    bottom: 3%; // 固定在底部
    left: 50%;
    width: fit-content;
    height: 40px;
    background-color: white; // 可以根据需要修改背景颜色
    padding: 10px;
    text-align: center;
    transform: translateX(-50%);
    Button {
      margin: 0 10px;
    }
    z-index: 999;
  }
  
  .pdf-container {
    width: 100%;
    height: 100%;
  }
  
  .react-pdf__Page {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PdfViewer: FC = () => {
    const [pdfUrl, setPdfUrl] = useState<string>('public/test.pdf');
    const [numPages, setNumPages] = useState<number>(0);
    const [height, setHeight] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    // 引用 canvas 元素和容器元素
    const containerRef = useRef<HTMLDivElement | null>(null);

    // 处理 PDF 加载成功
    const onLoadSuccess = ({ numPages }: any) => {
        setNumPages(numPages);
    };

    // 处理页面点击事件
    const onPdfElementClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        console.log(e, '----', target);
        // if (target && target.classList.contains('pdf-interactive')) {
        //     message.info('PDF元素被点击!');
        //     // 可以在这里处理交互逻辑，比如跳转到其他页面、显示更多内容等
        // }
    };

    const changePage = (model: 'add' | 'minus') => {
        model === 'add' ? setPageNumber(pageNumber + 1) : setPageNumber(pageNumber - 1);
        //calculateScale()
    }

    // 在 canvas 加载完成后计算 scale
    useEffect(() => {
        setHeight(containerRef.current?.clientHeight)
    }, [containerRef]);

    return (
        <Container ref={containerRef}>
            <div className="pdf-container" onClick={onPdfElementClick}>
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onLoadSuccess}
                >
                    <Page
                        pageNumber={pageNumber}
                        height={height || 300}
                        // onRenderSuccess={(canvas) => {
                        //     console.log(canvas)
                        // }}
                    />
                </Document>
            </div>
            <div className="pdf-toolbar">
                <Button onClick={() =>changePage('minus')} disabled={pageNumber <= 1}>
                    上一页
                </Button>
                <Button onClick={() =>changePage('add')} disabled={pageNumber >= numPages}>
                    下一页
                </Button>
            </div>
        </Container>
    );
};

export default PdfViewer;
