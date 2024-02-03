import { useCallback, useState } from "react";
import RemoteStreamMedia from "./RemoteStreamMedia";
import { utils } from "../../../utils/meetingUtils";

function MediaGallery(props) {
  const [gridCol, setGridCol] = useState(1);
  const [gridRow, setGridRow] = useState(1);
  const calculateNumberOfRows = useCallback(
    (participants, gridCol) => Math.ceil(participants.length / gridCol),
    []
  );

  const calculateNumberOfColumns = useCallback(
    (participants) =>
      participants && participants.length > 0
        ? Math.ceil(Math.sqrt(participants.length))
        : 1,
    []
  );

  function getMediaGalleryTilesForParticipants(
    participants,
    userId,
    displayName
  ) {
    const remoteParticipantMedia = participants.map((participant) => (
      <div
        className="MediaGallery-Style"
        key={utils.getId(participant.identifier)}
      >
        <RemoteStreamMedia
          meetTime={props.meetTime}
          key={utils.getId(participant.identifier)}
          stream={participant.videoStreams[0]}
          label={displayName ?? utils.getId(participant.identifier)}
        />
      </div>
    ));

    // const localParticipantMedia = (
    //   <div
    //     className="MediaGallery-Style"
    //     key={userId}
    //     style={{
    //       position: "absolute",
    //       right: "1.7rem",
    //       bottom: "1.8rem",
    //       width: "14rem",
    //       height: "8rem",
    //     }}
    //   >
    //     <LocalStreamMedia
    //       type={2}
    //       key={userId}
    //       displayName={props.displayName}
    //       stream={props.localVideoStream}
    //       setView={props.setView}
    //     />
    //   </div>
    // );
    // // console.log(remoteParticipantMedia,'remoteParticipantMedia');
    if (remoteParticipantMedia.length === 0) {
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Still waiting for someone else to join in</p>
        </div>
      );
    }
    // remoteParticipantMedia.push( localParticipantMedia );
    return remoteParticipantMedia;
  }

  const numberOfColumns = calculateNumberOfColumns(props.remoteParticipants);
  if (numberOfColumns !== gridCol) setGridCol(numberOfColumns);
  const numberOfRows = calculateNumberOfRows(props.remoteParticipants, gridCol);
  if (numberOfRows !== gridRow) setGridRow(numberOfRows);
  return (
    <div
      style={{
        gridTemplateRows: `repeat(${gridRow}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${gridCol}, 1fr)`,
        position: "relative",
      }}
      className="MediaGallery"
    >
      {getMediaGalleryTilesForParticipants(
        props.remoteParticipants,
        props.userId,
        props.displayName
      )}
    </div>
  );
}

export default MediaGallery;
