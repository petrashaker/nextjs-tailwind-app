/**
 * Displays loading logo as a component.
 * Enables setting fill property with CSS (if not set by CSS defaults to black).
 */
const LoadingLogo = () => {
  return (
    <svg className="w-7 h-7" width="85" height="89" viewBox="0 0 85 89" xmlns="http://www.w3.org/2000/svg">
      <path d="M44.4842 20.775C50.221 20.775 54.8716 16.1243 54.8716 10.3875C54.8716 4.65063 50.221 0 44.4842 0C38.7473 0 34.0967 4.65063 34.0967 10.3875C34.0967 16.1243 38.7473 20.775 44.4842 20.775Z" />
      <path d="M44.4838 88.8093C47.9255 88.8093 50.7156 86.0193 50.7156 82.5775C50.7156 79.1358 47.9255 76.3457 44.4838 76.3457C41.042 76.3457 38.252 79.1358 38.252 82.5775C38.252 86.0193 41.042 88.8093 44.4838 88.8093Z" />
      <path d="M18.9598 30.3062C24.1233 30.3062 28.3092 26.1204 28.3092 20.9568C28.3092 15.7933 24.1233 11.6074 18.9598 11.6074C13.7962 11.6074 9.61035 15.7933 9.61035 20.9568C9.61035 26.1204 13.7962 30.3062 18.9598 30.3062Z" />
      <path d="M70.0072 77.1941C72.8756 77.1941 75.201 74.8688 75.201 72.0004C75.201 69.132 72.8756 66.8066 70.0072 66.8066C67.1388 66.8066 64.8135 69.132 64.8135 72.0004C64.8135 74.8688 67.1388 77.1941 70.0072 77.1941Z" />
      <path d="M8.38706 54.7917C12.9754 54.7917 16.695 51.0721 16.695 46.4837C16.695 41.8954 12.9754 38.1758 8.38706 38.1758C3.7987 38.1758 0.0791016 41.8954 0.0791016 46.4837C0.0791016 51.0721 3.7987 54.7917 8.38706 54.7917Z" />
      <path d="M80.5771 50.6327C82.8703 50.6327 84.7294 48.7737 84.7294 46.4804C84.7294 44.1872 82.8703 42.3281 80.5771 42.3281C78.2839 42.3281 76.4248 44.1872 76.4248 46.4804C76.4248 48.7737 78.2839 50.6327 80.5771 50.6327Z" />
      <path d="M13.8204 66.8682C10.9791 69.7094 10.9791 74.3066 13.8204 77.1478C16.6582 79.989 21.2621 79.989 24.1 77.1478C26.9412 74.3066 26.9412 69.7094 24.1 66.8682C21.2621 64.0236 16.6616 63.9966 13.8204 66.8682Z" />
      <path d="M70.0039 24.0722C71.7238 24.0722 73.1181 22.6779 73.1181 20.958C73.1181 19.238 71.7238 17.8438 70.0039 17.8438C68.2839 17.8438 66.8896 19.238 66.8896 20.958C66.8896 22.6779 68.2839 24.0722 70.0039 24.0722Z" />
    </svg>
  );
};

export default LoadingLogo;