import Validator from "validatorjs";

import validatorPlugin from "@/plugins/validator";
import { getters } from "@/store/userForm";

validatorPlugin.install();

describe("store/userForm", () => {
  describe("getters", () => {
    describe("validation", () => {
      it("正常", () => {
        const user = {
          name: null,
          email: null,
          age: null
        };

        const validation = getters.validation({ user });

        expect(validation).toEqual(expect.any(Validator));
      });
    });

    describe("errors", () => {
      it("正常", () => {
        const user = {
          name: null,
          email: null,
          age: null
        };
        const validation = getters.validation({ user });

        const errors = getters.errors(null, { validation });

        console.log(errors);

        expect(errors.has("name")).toBeTruthy();
      });
    });
  });

  describe("入力チェック", () => {
    describe("user", () => {
      describe("name", () => {
        it("正常", () => {
          const user = {
            name: "John",
            email: null,
            age: null
          };

          const validation = getters.validation({ user });

          expect(validation.errors.has("name")).toBeFalsy();
        });

        it("必須チェック", () => {
          const user = {
            name: null,
            email: null,
            age: null
          };

          const validation = getters.validation({ user });

          expect(validation.errors.first("name")).toBe(
            "ユーザー名は必須です。"
          );
        });

        it("最大文字数チェック:10文字", () => {
          const user = {
            name: "1234567890",
            email: null,
            age: null
          };

          const validation = getters.validation({ user });

          expect(validation.errors.has("name")).toBeFalsy();
        });

        it("最大文字数チェック:11文字", () => {
          const user = {
            name: "12345678901",
            email: null,
            age: null
          };

          const validation = getters.validation({ user });

          expect(validation.errors.first("name")).toBe(
            "ユーザー名は10文字以下で入力してください。"
          );
        });
      });

      describe("email", () => {
        it("正常", () => {
          const user = {
            name: null,
            email: "test@test.com",
            age: null
          };

          const validation = getters.validation({ user });

          expect(validation.errors.has("email")).toBeFalsy();
        });

        it("必須チェック", () => {
          const user = {
            name: null,
            email: null,
            age: null
          };

          const validation = getters.validation({ user });

          expect(validation.errors.first("email")).toBe(
            "メールアドレスは必須です。"
          );
        });

        it("メールアドレス形式チェック", () => {
          const user = {
            name: null,
            email: "John",
            age: null
          };

          const validation = getters.validation({ user });

          expect(validation.errors.first("email")).toBe(
            "メールアドレスは正しいメールアドレスを入力してください。"
          );
        });
      });

      describe("age", () => {
        it("正常", () => {
          const user = {
            name: null,
            email: null,
            age: 20
          };

          const validation = getters.validation({ user });

          expect(validation.errors.has("age")).toBeFalsy();
        });

        it("必須チェック", () => {
          const user = {
            name: null,
            email: null,
            age: null
          };

          const validation = getters.validation({ user });

          expect(validation.errors.first("age")).toBe("年齢は必須です。");
        });

        it("数値チェック", () => {
          const user = {
            name: null,
            email: null,
            age: 10.1
          };

          const validation = getters.validation({ user });

          expect(validation.errors.first("age")).toBe(
            "年齢は整数で入力してください。"
          );
        });
      });
    });
  });
});
