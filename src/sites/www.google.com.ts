import { antiRedirect, decreaseRedirect, getRedirect, increaseRedirect } from "../utils";
import { IProvider } from "@/provider";
import http from "gm-http";
import pRetry from "p-retry";

export class GoogleProvider implements IProvider {
  public test = true;
  public resolve(aElement: HTMLAnchorElement) {
    const traceProperties = ["ping", "data-jsarwt", "data-usg", "data-ved"];

    // 移除追踪
    for (const property of traceProperties) {
      if (aElement.getAttribute(property)) {
        aElement.removeAttribute(property);
      }
    }

    // 移除多余的事件
    if (aElement.getAttribute("onmousedown")) {
      aElement.removeAttribute("onmousedown");
    }

    // 尝试去除重定向
    if (aElement.getAttribute("data-href")) {
      const realUrl: string = aElement.getAttribute("data-href");
      antiRedirect(aElement, realUrl);
    }

    const url = new URL(aElement.href);

    const redirectUrl = url.searchParams.get("url");

    if (!redirectUrl) {
      return;
    }

    // 旧版 Google 将目标地址直接放在 url 参数中；新版 /goto?url=CAES... 则使用不透明令牌。
    if (this.isHttpUrl(redirectUrl)) {
      antiRedirect(aElement, redirectUrl);
      return;
    }

    // 不透明令牌需要让 GM_xmlhttpRequest 跟随跳转，以取得真实的最终地址。
    if (getRedirect(aElement) <= 2) {
      increaseRedirect(aElement);
      pRetry(() => this.resolveRedirect(aElement), { retries: 3 })
        .then(() => decreaseRedirect(aElement))
        .catch(() => decreaseRedirect(aElement));
    }
  }

  private isHttpUrl(value: string): boolean {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  private async resolveRedirect(aElement: HTMLAnchorElement): Promise<Response$> {
    try {
      const res = await http.request({
        url: aElement.href,
        method: "GET",
        anonymous: true,
      });

      if (res.finalUrl && this.isHttpUrl(res.finalUrl)) {
        antiRedirect(aElement, res.finalUrl);
      }

      return res;
    } catch (err) {
      console.error(err);
      return Promise.reject(new Error(`[http]: ${aElement.href} fail`));
    }
  }
}
