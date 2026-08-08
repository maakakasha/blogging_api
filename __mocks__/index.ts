import { type Request, type Response } from "express";
import { vi } from "vitest";

export const reqMock = {} as Request;

export const resMock = { send: vi.fn(), json: vi.fn() } as unknown as Response;

export const nextMock = vi.fn();
