import { useContext, useEffect, useState } from "react";

// components
import { PageContainer, PageFooter } from "@/components";

// context
import { GlobalDispatchContext, GlobalStateContext } from "@/context/GlobalContext";

// utils
import { backendAPI, setErrorMessage, setGameState } from "@/utils";

const defaultDroppedAsset = { assetName: "", bottomLayerURL: "", id: null, topLayerURL: null };

const Home = () => {
  const dispatch = useContext(GlobalDispatchContext);
  const { gameState, hasInteractiveParams, hasSetupBackend } = useContext(GlobalStateContext);

  const [isLoading, setIsLoading] = useState(false);
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);
  const [droppedAsset, setDroppedAsset] = useState(defaultDroppedAsset);

  useEffect(() => {
    if (hasInteractiveParams) {
      backendAPI
        .get("/dropped-asset")
        .then((response) => {
          setGameState(dispatch, response.data);
          setDroppedAsset(response.data.droppedAsset);
        })
        .then(() => {
          backendAPI.put("/world/fire-toast");
        })
        .catch((error) => setErrorMessage(dispatch, error))
        .finally(() => {
          setIsLoading(false);
          console.log("🚀 ~ Home.tsx ~ gameState:", gameState);
        });
    }
  }, [hasInteractiveParams]);

  const handleGetDroppedAsset = async () => {
    setAreButtonsDisabled(true);
    setDroppedAsset(defaultDroppedAsset);

    backendAPI
      .get("/dropped-asset")
      .then((response) => {
        setDroppedAsset(response.data.droppedAsset);
      })
      .catch((error) => setErrorMessage(dispatch, error))
      .finally(() => {
        setAreButtonsDisabled(false);
      });
  };

  if (!hasSetupBackend) return <div />;

  return (
    <PageContainer isLoading={isLoading}>
      <>
        <h1 className="h2">Server side example using interactive parameters</h1>
        <div className="max-w-screen-lg">
          {!hasInteractiveParams ? (
            <p>
              Edit an asset in your world and open the Links page in the Modify Asset drawer and add a link to your
              website or use &quot;http://localhost:3000&quot; for testing locally. You can also add assetId,
              interactiveNonce, interactivePublicKey, urlSlug, and visitorId directly to the URL as search parameters to
              use this feature.
            </p>
          ) : (
            <p className="my-4">Interactive parameters found, nice work!</p>
          )}
        </div>

        {droppedAsset.id && (
          <div className="flex flex-col w-full items-start">
            <p className="mt-4 mb-2">
              You have successfully retrieved the dropped asset details for {droppedAsset.assetName}!
            </p>
            <img
              className="w-96 h-96 object-cover rounded-2xl my-4"
              alt="preview"
              src={droppedAsset.topLayerURL || droppedAsset.bottomLayerURL}
            />
          </div>
        )}

        <PageFooter>
          <button className="btn" disabled={areButtonsDisabled} onClick={handleGetDroppedAsset}>
            Get Dropped Asset Details
          </button>
        </PageFooter>
      </>
    </PageContainer>
  );
};

export default Home;
