import { useRouter } from "next/router";
import styled from "styled-components";

export const FormContainer = styled.form`
  display: grid;
  gap: 0.3rem;
`;

const fertiliserSeasons = ["Spring", "Summer", "Autumn", "Winter"];

export default function Form({ onSubmit, initialValues = {} }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.fertiliserSeason = formData.getAll("fertiliserSeason");

    // Custom validation: at least one fertiliserSeason checkbox checked
    if (data.fertiliserSeason.length === 0) {
      alert("Please select at least one fertiliser season.");
      return;
    }

    onSubmit(data);
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={initialValues.name || ""}
        />

        <label htmlFor="botanicalName">Botanical Name</label>
        <input
          id="botanicalName"
          name="botanicalName"
          type="text"
          required
          defaultValue={initialValues.botanicalName || ""}
        />

        <label htmlFor="imageUrl">Image Url</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          required
          defaultValue={initialValues.imageUrl || ""}
        />

        <label htmlFor="waterNeed">Water Need</label>
        <select
          id="waterNeed"
          name="waterNeed"
          required
          defaultValue={initialValues.waterNeed || ""}
        >
          <option value="">Select water need</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label htmlFor="lightNeed">Light Need</label>
        <select
          id="lightNeed"
          name="lightNeed"
          required
          defaultValue={initialValues.lightNeed || ""}
        >
          <option value="">Select light need</option>
          <option value="Full Sun">Full Sun</option>
          <option value="Partial Shade">Partial Shade</option>
          <option value="Shade">Shade</option>
        </select>

        <label>Fertiliser Season</label>
        <div>
          {fertiliserSeasons.map((season) => (
            <label key={season} style={{ marginRight: "1rem" }}>
              <input
                type="checkbox"
                name="fertiliserSeason"
                value={season}
                defaultChecked={initialValues.fertiliserSeason?.includes(
                  season
                )}
              />
              {season}
            </label>
          ))}
        </div>

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="5"
          required
          defaultValue={initialValues.description || ""}
        ></textarea>

        <button type="submit">Submit</button>
      </FormContainer>
    </>
  );
}
