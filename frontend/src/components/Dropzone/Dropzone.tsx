import "./style.dropzone.css"

type DropzoneProps = {
    setEnabled?: (enabled: boolean) => void;
    setOuterImagePreview?: (preview: string | null) => void
    analyzeOnClick?: () => void;
    setFile?: (file: File | null) => void;
    loading: boolean;
}

export const Dropzone = ({ setEnabled, setOuterImagePreview, analyzeOnClick, setFile, loading }: DropzoneProps) => {
    return (
        
    )
}