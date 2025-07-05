
import { pgTable, serial, text, integer, decimal, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  plan: text('plan').notNull(),
  status: text('status').notNull().default('Active'),
  nextBilling: text('next_billing').notNull(),
  totalSpent: decimal('total_spent', { precision: 10, scale: 2 }).notNull().default('0'),
  joinDate: text('join_date').notNull(),
  lastOrder: text('last_order'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  cost: decimal('cost', { precision: 10, scale: 2 }).notNull(),
  retail: decimal('retail', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull().default(0),
  supplier: text('supplier').notNull(),
  sku: text('sku').unique(),
  reorderPoint: integer('reorder_point').notNull().default(0),
  maxStock: integer('max_stock').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderId: text('order_id').notNull().unique(),
  customer: text('customer').notNull(),
  dueDate: text('due_date').notNull(),
  items: integer('items').notNull(),
  status: text('status').notNull().default('pending'),
  priority: text('priority').notNull().default('normal'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const boxes = pgTable('boxes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  theme: text('theme'),
  shipDate: text('ship_date'),
  description: text('description'),
  products: jsonb('products').default([]),
  totalCost: decimal('total_cost', { precision: 10, scale: 2 }).notNull().default('0'),
  totalRetail: decimal('total_retail', { precision: 10, scale: 2 }).notNull().default('0'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Customer = typeof customers.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Box = typeof boxes.$inferSelect;
