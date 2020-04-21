import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Error, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [error, setError] = useState(false);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    uploadedFiles.forEach((uploadedFile) =>
      data.append('file', uploadedFile.file),
    );

    try {
      const response = await api.post('/transactions/import', data);

      if (response.status === 200) {
        if (error) setError(false);
        history.goBack();
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  }

  function submitFile(files: File[]): void {
    const fileProps = files.map((file) => {
      const fileProp: FileProps = {
        file,
        name: file.name,
        readableSize: filesize(file.size),
      };
      return fileProp;
    });

    setUploadedFiles([...uploadedFiles, ...fileProps]);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          {error && <Error>Erro desconhecido ao importar</Error>}
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
