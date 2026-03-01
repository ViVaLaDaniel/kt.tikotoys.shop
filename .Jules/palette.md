## 2023-10-27 - [Aria labels on repeated controls]
**Learning:** When using repeated controls like quantity "-" and "+" buttons (especially in lists like a shopping cart), simply adding `aria-label="Decrease quantity"` isn't enough. Screen reader users won't know *which* item's quantity is being modified.
**Action:** Use context-aware aria-labels that include the item's name, e.g., `aria-label={"Decrease quantity of " + product.name}` to provide clear context for each repeated control.
