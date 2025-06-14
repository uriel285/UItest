import ImageFetcher from '../components/ImageFetcher'; // Ajusta la ruta de importación

const MyPage: React.FC = () => {
    return (
        <div>
            <h1>Imagen Cargada desde AWS</h1>
            <ImageFetcher path={'DSC_0002.JPG'}            />
        </div>
    );
};

export default MyPage;
