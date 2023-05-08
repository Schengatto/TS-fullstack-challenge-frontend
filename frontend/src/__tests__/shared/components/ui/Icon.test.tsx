import { render } from "@testing-library/react";
import Icon, { IconProps } from "shared/components/ui/Icon";

const makeSut = (props: IconProps) => {
    return render(<Icon {...props} />);
};

test("Should render icon search correctly", () => {
    const { getByTestId } = makeSut({ type: "search" });

    expect(getByTestId("Icon__Search")).toBeInTheDocument();
});

test("Should render icon prev correctly", () => {
    const { getByTestId } = makeSut({ type: "prev" });

    expect(getByTestId("Icon__Prev")).toBeInTheDocument();
});

test("Should render icon next correctly", () => {
    const { getByTestId } = makeSut({ type: "next" });

    expect(getByTestId("Icon__Next")).toBeInTheDocument();
});
