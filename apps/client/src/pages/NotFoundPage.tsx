import { Button, ConfigProvider, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────────────────────
// NOT FOUND PAGE
// Usage: <Route path="*" element={<NotFoundPage />} />
// ─────────────────────────────────────────────────────────────────────────────
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1A1A1A',
            borderRadius: 12,
            fontFamily: 'inherit',
          },
          components: {
            Button: {
              primaryColor: '#ffffff',
              colorPrimary: '#1A1A1A',
              colorPrimaryHover: '#333333',
              colorPrimaryActive: '#000000',
              controlHeight: 44,
              paddingInline: 28,
              fontWeight: 700,
            },
            Result: {
              titleFontSize: 22,
              subtitleFontSize: 14,
            },
          },
        }}
      >
        <Result
          status="404"
          title={<span className="text-[#1A1A1A] font-black tracking-tight">404</span>}
          subTitle={
            <span className="text-[#A1A1AA] text-sm">
              Sorry, the page you visited does not exist.
            </span>
          }
          extra={
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={() => navigate(-1)}
                style={{
                  height: 44,
                  paddingInline: 24,
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: 14,
                  borderColor: '#E8E8E2',
                  color: '#71717A',
                  backgroundColor: '#FAFAFA',
                }}
              >
                Go back
              </Button>

              <Button
                type="primary"
                onClick={() => navigate('/')}
                style={{
                  height: 44,
                  paddingInline: 24,
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                Back Home
              </Button>
            </div>
          }
        />
      </ConfigProvider>
    </div>
  );
};

export default NotFoundPage;
