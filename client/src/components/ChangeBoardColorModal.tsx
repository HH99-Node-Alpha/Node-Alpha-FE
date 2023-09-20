import React from "react";
import { ColorType } from "../types/WorkspacesBoards";

interface ChangeBoardColorModalProps {
  isColorModalOpen: boolean;
  modalRef: any;
  closeModal: () => void;
  handleSave: () => void;
  handleBackgroundSelect: (background: ColorType) => void;
  tempSelectedBackground: ColorType | null;
  backgrounds: ColorType[];
  previewBackgroundStyle: React.CSSProperties;
}

const ChangeBoardColorModal: React.FC<ChangeBoardColorModalProps> = ({
  isColorModalOpen,
  modalRef,
  closeModal,
  handleSave,
  handleBackgroundSelect,
  tempSelectedBackground,
  backgrounds,
  previewBackgroundStyle,
}) => {
  return isColorModalOpen ? (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-60"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        ref={modalRef}
        className="bg-white p-4 rounded-md w-[900px] h-[600px] flex flex-col overflow-hidden justify-between"
      >
        <div className="flex justify-between items-center">
          <div></div>
          <button onClick={closeModal}>X</button>
        </div>

        <div className="flex h-full gap-4">
          <div className="w-1/2 h-full flex flex-col items-center justify-center gap-4">
            <div
              className="w-full h-1/2 rounded-md"
              style={{
                ...previewBackgroundStyle,
                background:
                  typeof previewBackgroundStyle?.background === "string"
                    ? previewBackgroundStyle.background.replace(
                        "linear-gradient(linear-gradient",
                        "linear-gradient"
                      )
                    : previewBackgroundStyle?.background,
              }}
            >
              {tempSelectedBackground?.backgroundUrl && (
                <img
                  src={tempSelectedBackground.backgroundUrl}
                  alt="Selected Background"
                />
              )}
              {!tempSelectedBackground?.backgroundUrl && (
                <div
                  style={{
                    background: `linear-gradient(${tempSelectedBackground?.startColor})`,
                  }}
                ></div>
              )}
            </div>
            <button onClick={handleSave}>적용하기</button>
          </div>

          <div className="w-1/2 overflow-y-auto flex flex-col gap-4">
            <div>
              <div className="mb-2">Image</div>
              <div className="grid grid-cols-3 justify-items-center gap-4">
                {backgrounds
                  .filter((bg) => bg.backgroundUrl)
                  .map((background) => (
                    <div
                      className="w-[90px] h-[60px] rounded-md"
                      key={background.colorId}
                      style={{
                        background: `url(${background.backgroundUrl}) center/cover`,
                      }}
                      onClick={() => handleBackgroundSelect(background)}
                    ></div>
                  ))}
              </div>
            </div>

            <div>
              <div className="mb-2">Gradation</div>
              <div className="grid grid-cols-3 justify-items-center gap-4">
                {backgrounds
                  .filter((bg) => bg.startColor && !bg.endColor)
                  .map((background) => (
                    <div
                      className="w-[90px] h-[60px] rounded-md"
                      key={background.colorId}
                      style={{ background: `${background.startColor}` }}
                      onClick={() => handleBackgroundSelect(background)}
                    ></div>
                  ))}
              </div>
            </div>

            <div>
              <div className="mb-2">Color</div>
              <div className="grid grid-cols-3 justify-items-center gap-4">
                {backgrounds
                  .filter((bg) => !bg.startColor && bg.endColor)
                  .map((background) => (
                    <div
                      className="w-[90px] h-[60px] rounded-md"
                      key={background.colorId}
                      style={{ background: `${background.endColor}` }}
                      onClick={() => handleBackgroundSelect(background)}
                    ></div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ChangeBoardColorModal;
