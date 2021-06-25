import React from "react";
import { Pagination, Icon, Button } from "semantic-ui-react";

export default function HrmsPagination({ totalJobAdvertisements, jobAdvertisementsPerPage, setJobAdvertisementsPerPage, paginate }) {
  return (
    <div>
      <Pagination
        className="bg-dark"
        inverted
        defaultActivePage={1}
        ellipsisItem={{
          content: <Icon name="ellipsis horizontal" />,
          icon: true,
        }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
        totalPages={Math.ceil(totalJobAdvertisements / jobAdvertisementsPerPage)}
        onPageChange={(e, { activePage }) => paginate(activePage)}
      />

      <Button
        floated="right"
        className="bg-dark text-white"
        style={{ height: "40px", verticalAlign: "middle" }}
        content="100"
        onClick={() => setJobAdvertisementsPerPage(100)}
      />
      <Button
        floated="right"
        className="bg-dark text-white"
        style={{ height: "40px", verticalAlign: "middle" }}
        content="50"
        onClick={() => setJobAdvertisementsPerPage(50)}
      />
      <Button
        floated="right"
        className="bg-dark text-white"
        style={{ height: "40px", verticalAlign: "middle" }}
        content="20"
        onClick={() => setJobAdvertisementsPerPage(20)}
      />
      <Button
        floated="right"
        className="bg-dark text-white"
        style={{ height: "40px", verticalAlign: "middle" }}
        content="10"
        onClick={() => setJobAdvertisementsPerPage(10)}
      />
    </div>
  );
}
