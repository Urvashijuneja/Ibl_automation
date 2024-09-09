import { AxiosResponse } from "axios";
import { expect } from "chai";

export class APIAssertions {

    async assertStatusCode(response: AxiosResponse, statusCode: number) {
        expect(response.status).to.equal(statusCode);;
    }

    async assertToInclude(response: AxiosResponse, expectedValue: string) {
        expect(JSON.stringify(response.data)).to.include(expectedValue);
    }

    async assertEqual(actualValue, expectedValue) {
        expect(actualValue.toString()).to.equal(expectedValue.toString());
    }

    async assertBooleanfalse(fieldName: boolean) {
        expect(fieldName).to.be.a('boolean').and.to.be.false;
    }

    async assertUndefinedValue(fieldName: any) {
        expect(fieldName).to.not.undefined;
    }
}