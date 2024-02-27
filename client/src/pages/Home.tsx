import { backendAPI } from "@/utils/backendAPI";
import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

const Home = () => {
  const [droppedAsset, setDroppedAsset] = useState();

  const hasInteractiveParams = null;

  const handleGetDroppedAsset = async () => {
    try {
      const result = await backendAPI.get("/dropped-asset");
      if (result.data.success) {
        setDroppedAsset(result.data.droppedAsset);
      } else return console.log("Error getting data object");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container direction="column" justifyContent="space-around" p={10}>
      <Grid item>
        <Grid alignItems="center" container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Server side example using interactive parameters</Typography>
          </Grid>
          <Grid item xs={12}>
            {!hasInteractiveParams ? (
              <Typography>
                Edit an asset in your world and open the Links page in the Modify Asset drawer and add a link to your
                website or use &quot;http://localhost:3000&quot; for testing locally. You can also add assetId,
                interactiveNonce, interactivePublicKey, urlSlug, and visitorId directly to the URL as search parameters
                to use this feature.
              </Typography>
            ) : (
              <Typography>Interactive parameters found, nice work!</Typography>
            )}
          </Grid>
          <Grid item>
            <Button onClick={handleGetDroppedAsset} variant="contained">
              Get Dropped Asset Details
            </Button>
          </Grid>
          {droppedAsset && (
            <>
              <Grid item pt={4} xs={12}>
              <Typography>
                You have successfully retrieved the dropped asset details for {droppedAsset.assetName}!
              </Typography>
            </Grid>
            <Grid item m={4} xs={12}>
              <img alt="preview" src={droppedAsset.topLayerURL || droppedAsset.bottomLayerURL} />
            </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
