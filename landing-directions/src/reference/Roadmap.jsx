import React from "react";
import { CommerceLayout } from "./CommerceLayout";
import { PurchaseAction } from "./PurchaseControls";

export default function Roadmap() {
  return (
    <CommerceLayout steps={false}>
      <div className="purchase-surface">
        <div className="commerce-intro">
          <h1>Product roadmap.</h1>
          <p>Follow updates to OrgTik services and software.</p>
        </div>
        <section className="purchase-checkout-panel">
          <h2>Updates will appear here</h2>
          <p>
            No public roadmap updates have been published yet. Have an
            improvement in mind? Share it with our team.
          </p>
          <nav className="purchase-cart-additions" aria-label="Roadmap actions">
            <PurchaseAction href="/contact">
              Suggest an improvement
            </PurchaseAction>
            <PurchaseAction secondary href="/software">
              Explore software
            </PurchaseAction>
          </nav>
        </section>
      </div>
    </CommerceLayout>
  );
}
