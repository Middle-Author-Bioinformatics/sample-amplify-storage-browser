import './App.css';

import config from '../amplify_outputs.json';
import { Amplify } from 'aws-amplify';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { FileUploader } from '@aws-amplify/ui-react-storage';

import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-storage/styles.css';

Amplify.configure(config);

function App() {
  return (
    <div className="portal">

      <div className="brand-bar">
        <img
          src="/mab-logo.png"
          alt="Middle Author Bioinformatics"
          className="mab-logo"
        />
      </div>

      <Authenticator>
        {({ signOut, user }) => (
          <>
            <header className="header">
              <div>
                <p className="welcome">
                  Secure data transfer to Middle Author Bioinformatics
                </p>
              </div>

              <div className="user-controls">
                <span>
                  {user?.signInDetails?.loginId || user?.username}
                </span>

                <Button onClick={signOut}>
                  Sign out
                </Button>
              </div>
            </header>

            <main className="upload-container">

              <div className="upload-card">

                <h2>Upload project files</h2>

                <p className="upload-description">
                  Drag and drop your sequencing data below, or select files
                  from your computer.
                </p>

                <FileUploader
                  acceptedFileTypes={['*']}
                  path={({ identityId }) =>
                    `private/${identityId}/`
                  }
                  maxFileCount={1000}
                  isResumable
                  displayText={{
                    dropFilesText: 'Drop files here or',
                    browseFilesText: 'Choose files',
                    getFilesUploadedText(count) {
                      return `${count} ${
                        count === 1 ? 'file' : 'files'
                      } uploaded successfully`;
                    },
                    getUploadingText(percentage) {
                      return `Uploading: ${percentage}%`;
                    },
                  }}
                />

                <p className="upload-note">
                  Please keep this browser window open until all uploads
                  are complete.
                </p>

              </div>

            </main>

            <footer>
              © Middle Author Bioinformatics
            </footer>
          </>
        )}
      </Authenticator>

    </div>
  );
}

export default App;